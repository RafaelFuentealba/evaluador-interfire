var latitude = -35.67;
var longitude = -71.54;
var zoom = 9;

/** maps and controls */
var map, openstreetmap, Carto_voyager, google_maps, google_terrain;
var sidebar, searchControl, results;

/** layers of the database */
var wmsIncendios2020, wmsIncendiosQuinquenio, wmsCausas2020, vmsCausasQuinquenio;

/** panel of layers control */
var panelLayers, baseLayers, overLayers;

/** DOM elements of the map */
var marker, position;
var popup = new L.popup();
var aPopup = [];
var aGeomanLayers = [];
var controlCustomLegends;



/** setting the base map and maps services */
map = L.map('map', { zoomControl: false, attributionControl: true}).setView([latitude, longitude], zoom);
		
openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
Opentopomap = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
Carto_voyager = L.tileLayer('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});
Stamen_Terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
});
osm_monocromatico = L.tileLayer('http://a.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	attribution: 'Wikimedia Labs | Map data &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
});
google_maps = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}');
google_terrain = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}');



$(window).on('load', function () {
	getPanelLayers([false, false, false, false, false]);
	$('.leaflet-panel-layers').hide();
	controlCustomLegends = L.control.custom({
		position: 'bottomright',
		classes : '',
		style   : {
			margin: '0px 12px 12px 0',
			padding: '0px',
		},
	});
});

/** hide mobile navbar when question modal is displayed */
$(window).on('shown.bs.modal', function() { 
	$('#top-icon-nav').css({ 'display':'none' });
	$('#mobile-nav').css({ 'display':'none' });
});

/** show mobile navbar when question modal is not shown */
$(window).on('hidden.bs.modal', function() {
	$('#top-icon-nav').css({ 'display':'block' });
	$('#mobile-nav').css({ 'display':'block' });
});

/** create the geocoding control and add it to the map */
searchControl = L.esri.Geocoding.geosearch({
	position: 'topleft',
    placeholder: 'Ingresar lugar o dirección',
    useMapBounds: 15,
    title: 'Buscar lugar o dirección',
	expanded: true,
	providers: [
        L.esri.Geocoding.arcgisOnlineProvider({
	        /** API Key to be passed to the ArcGIS Online Geocoding Service */
	        apikey: 'AAPK2753c497e422499f815f91d6d00526c1xbRwtMNqFXhUlGZr2uQoWJgvSIyw4-maMRTenvM5_KtrZnRTFK65j5FIlSQMMGYB'
	    })
	]
}).addTo(map);

/** create an empty layer group to store the results and add it to the map */
results = L.layerGroup().addTo(map);

/** listen for the results event and add every result to the map */
searchControl.on("results", function (data) {
	for (var i = data.results.length - 1; i >= 0; i--) {
	    latitude = data.results[i].latlng.lat;
	    longitude = data.results[i].latlng.lng;
	}
	getActiveOverlayers(); /** gets active overlayers */
	
	/** a dynamic marker is placed on the map after selecting a location */
	if (!isNaN(latitude) && !isNaN(longitude)) putMarkerOnMap(latitude, longitude);
});

/** create the control custom */
L.control.custom({
    position: 'bottomleft',
	/**'<button type="button" id="btn-location" class="btn btn-dark" title="Ir a mi ubicación">'+
              '    <i class="fas fa-crosshairs"></i>'+
              '</button>'+ */
    content : '<button type="button" id="btn-marker" class="btn btn-secondary" title="Colocar un marcador">'+
              '    <i class="fas fa-map-marker-alt"></i>'+
              '</button>'+
			  '<button type="button" id="btn-riesgo" class="btn btn-primary" title="Completar formulario">'+
              '    <i class="fas fa-check-circle"></i>'+
              '</button>'+
			  '<button type="button" id="btn-layers" class="btn btn-success" title="Ver grupo de capas">'+
              '    <i class="fas fa-layer-group"></i>'+
              '</button>'+
              '<button type="button" id="btn-legends" class="btn btn-info" title="Ver leyendas">'+
              '    <i class="fas fa-info"></i>'+
              '</button>'+
			  '<button type="button" id="btn-close-all" class="btn btn-danger" title="Cerrar todo">'+
              '    <i class="fas fa-times"></i>'+
              '</button>',
    classes : 'btn-group-vertical btn-group-sm',
    style   :
    {
        margin: '12px',
        padding: '0px 0 0 0',
        cursor: 'pointer',
    }
})
.addTo(map);

$('#btn-marker').on('click', function() {
	/** hide objects of map */
	$('.leaflet-panel-layers').hide();
	controlCustomLegends.options.content = '';
	controlCustomLegends.addTo(map);

	/** put a marker in the center of the map */
	let mapCenter = map.getCenter();
	putMarkerOnMap(mapCenter.lat, mapCenter.lng);
});

$('#btn-riesgo').on('click', function() {
	if (map.hasLayer(marker)) {
		$('#response-for-system-problems').css({ 'display':'none' });
		$('#response-get-information').css({ 'display':'none' });
		$('#response-put-marker').css({ 'display':'none' });
		marker.bindPopup(
			'<div class="text-center">' +
				'<input type="button" value="Completar formulario" class="theme-btn btn-style-two" onclick="getQuestionsForm()">' +
			'</div>'
		).openPopup();
	} else {
		$('#btn-modal').click();
		$('#response-for-system-problems').css({ 'display':'none' });
		$('#response-get-information').css({ 'display':'none' });
		$('#response-put-marker').css({ 'display':'block' });
	}
})

$('#btn-layers').on('click', function() {
	if (map.hasLayer(marker)) map.removeLayer(marker);
	controlCustomLegends.options.content = '';
	controlCustomLegends.addTo(map);
	$('.leaflet-panel-layers').show();
});

$('#btn-legends').on('click', function() {
	if (map.hasLayer(marker)) map.removeLayer(marker);
	$('.leaflet-panel-layers').hide();

	layers = getActiveOverlayers();
	if (layers[0] == true || layers[1] == true) {
		controlCustomLegends.options.content = '<img src="'+ window.location.origin +':8080/geoserver/interfire/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Incendios_2020_2021" style="display: block;">';
		controlCustomLegends.addTo(map);
	} else if (layers[2] == true || layers[3] == true) {
		controlCustomLegends.options.content = '<img src="'+ window.location.origin +':8080/geoserver/interfire/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Causas_Gral_2020_2021" style="display: block;">';
		controlCustomLegends.addTo(map);
	} else {
		controlCustomLegends.options.content = '';
		controlCustomLegends.addTo(map);
	}
});

$('#btn-close-all').on('click', function() {
	if (map.hasLayer(marker)) map.removeLayer(marker);
	$('.leaflet-panel-layers').hide();
	controlCustomLegends.options.content = '';
	controlCustomLegends.addTo(map);
});

$('#btn-send-data').on('click', function() {
	let element1 = $('input[name="element1"]:checked').val();
	let element2 = $('input[name="element2"]:checked').val();
	let element3 = $('input[name="element3"]:checked').val();
	let element4 = $('input[name="element4"]:checked').val();
	let element5 = $('input[name="element5"]:checked').val();
	let element6 = $('input[name="element6"]:checked').val();
	let element7 = $('input[name="element7"]:checked').val();
	let limpiezatecho1 = $('input[name="limpiezatecho1"]:checked').val();
	let entorno1 = $('input[name="entorno1"]:checked').val();
	
	if (!isNaN(element1) && !isNaN(element2) && !isNaN(element3) && !isNaN(element4) && !isNaN(element5) &&
	!isNaN(element6) && !isNaN(element7) && !isNaN(limpiezatecho1) && !isNaN(entorno1)) {
		/** hide all random messages */
		$('#random-message-1').css({ 'display':'none' });
		$('#random-message-2').css({ 'display':'none' });
		$('#random-message-3').css({ 'display':'none' });
		$('#random-message-4').css({ 'display':'none' });
		$('#random-message-5').css({ 'display':'none' });
		let randomMessage = Math.floor(Math.random() * (4 - 1) + 1);
		$('#random-message-'+randomMessage).css({ 'display':'block' });

		$('#fail-questions-form').css({ 'display':'none' });
		$('#modal-of-questions').modal('hide');
		$(".leaflet-popup-close-button")[0].click();
		$('#btn-modal').click();
		$('#response-put-marker').css({ 'display':'none' });
		$('#response-for-system-problems').css({ 'display':'none' });
		$('#response-get-information').css({ 'display':'block' });

		/** calculates vulnerabilidad based on answers */
		let patio = ((parseInt(element1) + parseInt(element2) + parseInt(element3) + parseInt(element4) + parseInt(element5) + parseInt(element6) + parseInt(element7)) / 7) * 0.3;
		let limpiezaTecho = parseInt(limpiezatecho1) * 0.3;
		let entorno = parseInt(entorno1) * 0.4;

		let center = marker.getLatLng();
		let riesgo = 0;
		let amenaza = 0;
		let vulnerabilidad = patio + limpiezaTecho + entorno;

		$.ajax({
			url: window.location.origin + '/riesgo/vivienda',
			method: 'POST',
			data: { "longitude-zone": center.lng, "latitude-zone": center.lat },
			success: function (response) {
				/** variables to prevalencia */
				let inc_quin_mean = 0;
				let inc_actual = 0;
				let inc_years = 0;
				let inc_percentage_dif = 0;
				let sup_quin_mean = 0;
				let sup_actual = 0;
				let sup_years = 0;
				let sup_percentage_dif = 0;
				let res_prevalence = 0;

				/** variables to pendiente */
				let res_pendiente = 0;

				/** variables to vegetacion combustible */
				let res_combustible = 0;

				/** calculates prevalencia */
				for (let key in response['incendios']) {
					if (key != 'inc_2020') {
						inc_quin_mean += parseInt(response['incendios'][key]);
						inc_years += 1;
					} else {
						inc_actual += parseInt(response['incendios'][key]);
					}
				}

				for (let key in response['superficie']) {
					if (key != 'sup_2020') {
						sup_quin_mean += parseFloat(response['superficie'][key]);
						sup_years += 1;
					} else {
						sup_actual += parseFloat(response['superficie'][key]);
					}
				}
				
				inc_quin_mean = inc_quin_mean / inc_years;
				if (inc_quin_mean == 0) inc_percentage_dif = 0;
				else inc_percentage_dif = Math.round(((inc_actual - inc_quin_mean) / inc_quin_mean) * 100);
				sup_quin_mean = sup_quin_mean / sup_years;
				if (sup_quin_mean == 0) sup_percentage_dif = 0;
				else sup_percentage_dif = Math.round(((sup_actual - sup_quin_mean) / sup_quin_mean) * 100);
				res_prevalence = getPrevalenceScore(inc_percentage_dif, sup_percentage_dif);
				
				/** calculates pendiente */
				for (let key in response['pendiente']) {
					if (response['pendiente'][key]['gridcode'] == 1) res_pendiente = 0;
					else if (response['pendiente'][key]['gridcode'] == 2) res_pendiente = 50;
					else if (response['pendiente'][key]['gridcode'] == 3) res_pendiente = 100;
				}

				/** calculates vegetacion combustible */
				for (let key in response['combustible']) {
					res_combustible = res_combustible + ((parseInt(response['combustible'][key]['puntaje']) * parseFloat(response['combustible'][key]['pc_superficie'])) / 100);
				}
				res_combustible = Math.round(res_combustible);
							
				if (res_pendiente == null) res_pendiente = 0;
				if (res_combustible == null) res_combustible = 0;

				/** calculates amenaza and check for negative values */
				amenaza = Math.round(0.5*res_prevalence + 0.25*res_pendiente + 0.25*res_combustible);
				if (amenaza < 0) amenaza = 0;
				if (vulnerabilidad < 0) vulnerabilidad = 0;
				
				/** calculates riesgo and check for negative riesgo value */
				riesgo = Math.round(0.3*amenaza + 0.7*vulnerabilidad);
				if (riesgo < 0) riesgo = 0;
				
				/** close the window with the waiting message  */
				$('#btn-close-window').click();

				/** show the modal with report of riesgo and recommendations */
				getRiesgoReport(marker, riesgo);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
				$('#btn-modal').click();
				$('#response-put-marker').css({ 'display':'none' });
				$('#response-get-information').css({ 'display':'none' });
				$('#response-for-system-problems').css({ 'display':'block' });
			}
		});
	} else {
		$('#fail-questions-form').css({ 'display':'block' });
	}
});

/** button click event to close the modal */
$('#btn-modal-close').on('click', function() {
	$('#modal-of-questions').modal('hide');
});

/** click event of the button to download the risk report */
$('#btn-download-report').on('click', function() {
	$('#btn-close-report').click();
	$('#report-full-information').css({ 'display':'block' });
	$('#report-basic-information').css({ 'display':'none' });
	let reportBody = $('#report-body').html();
	exportPDF(reportBody);
});

/** click event of the button to close the risk report */
$('#btn-close-report').on('click', function() {
	$('#modal-of-report').modal('hide');
});

/** button click event to close form error message */
$('#close-fail-questions-form').on('click', function() {
    $('#fail-questions-form').css({ 'display':'none' });
});

/** show the button to send data only if all questions was answered */
$(document).on('click', '.form-check-input', function () {
    let element1 = $('input[name="element1"]:checked').val();
	let element2 = $('input[name="element2"]:checked').val();
	let element3 = $('input[name="element3"]:checked').val();
	let element4 = $('input[name="element4"]:checked').val();
	let element5 = $('input[name="element5"]:checked').val();
	let element6 = $('input[name="element6"]:checked').val();
	let element7 = $('input[name="element7"]:checked').val();
	let limpiezatecho1 = $('input[name="limpiezatecho1"]:checked').val();
	let entorno1 = $('input[name="entorno1"]:checked').val();
	
	if (!isNaN(element1) && !isNaN(element2) && !isNaN(element3) && !isNaN(element4) && !isNaN(element5) &&
	!isNaN(element6) && !isNaN(element7) && !isNaN(limpiezatecho1) && !isNaN(entorno1)) {
		$('#btn-send-data').css({ 'display':'block' });
	}
});

/** return the active overlayers */
function getActiveOverlayers() {
	var overlayers = $('input.leaflet-panel-layers-selector:checkbox');
	var overlayersID = [];
	for (var layer of overlayers) {
		overlayersID.push(layer.checked);
	}
	return overlayersID;
}

/** put a marker on map based a latlng position */
function putMarkerOnMap(myLat, myLng) {
	if (map.hasLayer(marker)) map.removeLayer(marker); /** remove the old marker object of the map */

	/** create or update the marker object */
	if (!marker) marker = new L.marker([myLat, myLng], { draggable:'true' });
	else marker.setLatLng([myLat, myLng]);
	marker.on('dragend', function(e) {
		marker = e.target;
		position = marker.getLatLng();
		marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable:'true' });
		/** add a popup with a button to the question form in drag and drop event */
		marker.bindPopup(
			'<div class="text-center">' +
				'<input type="button" value="Completar formulario" class="theme-btn btn-style-two" onclick="getQuestionsForm()">' +
			'</div>'
		).openPopup();
		map.panTo(new L.LatLng(position.lat, position.lng));
	});
	map.addLayer(marker);

	/** add a popup with a button to the question form */
	marker.bindPopup(
		'<div class="text-center">' +
			'<input type="button" value="Completar formulario" class="theme-btn btn-style-two" onclick="getQuestionsForm()">' +
		'</div>'
	).openPopup();
}

/** display a form with questions to user */
function getQuestionsForm() {
	$('#fail-questions-form').css({ 'display':'none' });
	$('#btn-send-data').css({ 'display':'none' });
	$('#smartwizard').smartWizard("reset");
	$('#questions-form').trigger("reset");
	$('#modal-of-questions').modal('show');
}

function getRiesgoReport(myMarker, myRiesgo) {
	let center = myMarker.getLatLng();
	$('#report-body').empty();

	/** check level of riesgo */
	if (myRiesgo < 25) {
		$('#report-header').text('Riesgo muy bajo');
		$('#pdf-title').text('RIESGO MUY BAJO');
		$('#report-body').append('<p style="color:black; font-size:14px">En base a tu información y la consultada en base de datos sobre el sector, se estima que el riesgo de propagación de incendios forestal a tu vivienda es muy bajo.</p>');
	} else if (myRiesgo >= 25 && myRiesgo < 50) {
		$('#report-header').text('Riesgo bajo');
		$('#pdf-title').text('RIESGO BAJO');
		$('#report-body').append('<p style="color:black; font-size:14px">En base a tu información y la consultada en base de datos sobre el sector, se estima que el riesgo de propagación de incendios forestal a tu vivienda es bajo.</p>');
	} else if (myRiesgo >= 50 && myRiesgo < 75) {
		$('#report-header').text('Riesgo alto');
		$('#pdf-title').text('RIESGO ALTO');
		$('#report-body').append('<p style="color:black; font-size:14px">En base a tu información y la consultada en base de datos sobre el sector, se estima que el riesgo de propagación de incendios forestal a tu vivienda es alto.</p>');
	} else if (myRiesgo >= 75) {
		$('#report-header').text('Riesgo muy alto');
		$('#pdf-title').text('RIESGO MUY ALTO');
		$('#report-body').append('<p style="color:black; font-size:14px">En base a tu información y la consultada en base de datos sobre el sector, se estima que el riesgo de propagación de incendios forestal a tu vivienda es muy alto.</p>');
	}

	$.ajax({
		url: window.location.origin + '/causas/vivienda',
		method: 'POST',
		data: { "longitude-zone": center.lng, "latitude-zone": center.lat },
		success: function (response) {
			/** create a text with name of causas especificas */
			let causas = [];
			response['causas'].forEach(element => {
				causas.push(element['nombre_causa_especifica']);
			});
			causas = causas.join(', ');

			/** variables to prevalencia */
			let inc_quin_mean = 0;
			let inc_quinquenio = 0;
			let inc_actual = 0;
			let inc_years = 0;
			let inc_percentage_dif = 0;
			let sup_quin_mean = 0;
			let sup_quinquenio = 0;
			let sup_actual = 0;
			let sup_years = 0;
			let sup_percentage_dif = 0;
			let res_prevalence = 0;

			/** calculates prevalencia */
			for (let key in response['incendios']) {
				if (key != 'inc_2020') {
					inc_quin_mean += parseInt(response['incendios'][key]);
					inc_quinquenio += parseInt(response['incendios'][key]);
					inc_years += 1;
				} else {
					inc_actual += parseInt(response['incendios'][key]);
				}
			}

			for (let key in response['superficie']) {
				if (key != 'sup_2020') {
					sup_quin_mean += parseFloat(response['superficie'][key]);
					sup_quinquenio += parseFloat(response['superficie'][key]);
					sup_years += 1;
				} else {
					sup_actual += parseFloat(response['superficie'][key]);
				}
			}
			inc_quin_mean = inc_quin_mean / inc_years;
			if (inc_quin_mean == 0) inc_percentage_dif = 0;
			else inc_percentage_dif = Math.round(((inc_actual - inc_quin_mean) / inc_quin_mean) * 100);
			sup_quin_mean = sup_quin_mean / sup_years;
			if (sup_quin_mean == 0) sup_percentage_dif = 0;
			else sup_percentage_dif = Math.round(((sup_actual - sup_quin_mean) / sup_quin_mean) * 100);
			res_prevalence = getPrevalenceScore(inc_percentage_dif, sup_percentage_dif);
			
			/** selects a recommendation based on temporadas and incendios of temporadas */
			let recommendationText = '';
			let basicInformation = '';
			let ocurrenciaVariation = null;
			let danoVariation = null;
			if (inc_quinquenio == 0  && inc_actual == 0) {
				recommendationText = '';
				recommendationText = '<p style="color:black; font-size:14px">El radio de 2.5 kms alrededor de su vivienda NO registró incendios entre los años 2015 y 2021. Para mantener esta situación te recomendamos:</p>' +
									'<ul class="list-style-one">'+
										'<li style="color:black; font-size:14px; font-weight:normal;">Mantener techos y canaletas siempre limpios de hojas o ramas</li>'+
										'<li style="color:black; font-size:14px; font-weight:normal;">En patios y jardínes mantener pasto y hierbas a no más de 10 cms y elimine las que estén secas</li>'+
										'<li style="color:black; font-size:14px; font-weight:normal;">Organizarse con vecinos y el municipio para mantener entornos limpios de basuras, escombros o desechos</li>'+
									'</ul>';
				$('#report-body').append(recommendationText);
				$('#report-body').append(basicInformation);
			}
			else if (inc_quinquenio == 0 && inc_actual > 0) {
				recommendationText = '';
				basicInformation = '';
				recommendationText = '<div id="report-full-information" style="display:none;">'+
										'<p style="color:black; font-size:14px">Para el quinquenio 2015 a 2020, el radio de 2.5 kms alrededor de su vivienda NO registró incendios. Durante la última temporada (2020-2021) se registraron '+inc_actual+' incendios que afectaron '+checkIntegerOnDecimal(sup_actual)+' héctareas de vegetación, lo que representa un aumento de '+inc_percentage_dif+'% en la ocurrencia y de '+sup_percentage_dif+'% en daño.</p>' +
										'<p style="color:black; font-size:14px">Las principales causas de incendios en tu sector se relacionan con '+causas+'. Para prevenir la ocurrencia y propagación te recomendamos:</p>'+
										'<ul class="list-style-one">'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Mantener techos y canaletas siempre limpios de hojas o ramas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">En patios y jardínes mantener pasto y hierbas a no más de 10 cms y elimine las que estén secas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Organizarse con vecinos para mantener entornos limpios de basuras, escombros o desechos</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Que la organización del sector se coordine con el municipio para diseñar una Agenda de Prevención Local que contenga medidas de fiscalización, vigilancia, educación e información</li>'+
										'</ul>'+
									'</div>';
				basicInformation = '<div id="report-basic-information">'+
										'<p style="color:black; font-size:14px">Las principales causas de incendios en tu sector se relacionan con '+causas+'.</p>'+
										'<p style="color:black; font-size:14px">Si deseas conocer el número total de incendios y el daño ocasionado, sugerimos descargar el reporte.</p>'+
										'<p style="color:black; font-size:14px">Para prevenir la ocurrencia y propagación te recomendamos:</p>'+
										'<ul class="list-style-one">'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Mantener techos y canaletas siempre limpios de hojas o ramas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">En patios y jardínes mantener pasto y hierbas a no más de 10 cms y elimine las que estén secas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Organizarse con vecinos para mantener entornos limpios de basuras, escombros o desechos</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Que la organización del sector se coordine con el municipio para diseñar una Agenda de Prevención Local que contenga medidas de fiscalización, vigilancia, educación e información</li>'+
										'</ul>'+
									'</div>';
				$('#report-body').append(recommendationText);
				$('#report-body').append(basicInformation);
			}
			else if (inc_quinquenio > 0 && inc_actual == 0) {
				recommendationText = '';
				basicInformation = '';
				recommendationText = '<div id="report-full-information" style="display:none;">'+
										'<p style="color:black; font-size:14px">Para el quinquenio 2015 a 2020, el radio de 2.5 kms alrededor de su vivienda registró '+inc_quinquenio+' incendios que afectaron '+checkIntegerOnDecimal(sup_quinquenio)+' héctareas de vegetación. Durante la última temporada (2020-2021) NO se registraron incendios, lo que representa una disminución de '+inc_percentage_dif+'% en la ocurrencia y de '+sup_percentage_dif+'% en daño.</p>' +
										'<p style="color:black; font-size:14px">Las principales causas de incendios en tu sector se relacionan con '+causas+'. Para prevenir la ocurrencia y propagación te recomendamos:</p>'+
										'<ul class="list-style-one">'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Mantener techos y canaletas siempre limpios de hojas o ramas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">En patios y jardínes mantener pasto y hierbas a no más de 10 cms y elimine las que estén secas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Organizarse con vecinos para mantener entornos limpios de basuras, escombros o desechos</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Que la organización del sector se coordine con el municipio para diseñar una Agenda de Prevención Local que contenga medidas de fiscalización, vigilancia, educación e información</li>'+
										'</ul>'+
									'</div>';
				basicInformation = '<div id="report-basic-information">'+
									'<p style="color:black; font-size:14px">Las principales causas de incendios en tu sector se relacionan con '+causas+'.</p>'+
									'<p style="color:black; font-size:14px">Si deseas conocer el número total de incendios y el daño ocasionado, sugerimos descargar el reporte.</p>'+
									'<p style="color:black; font-size:14px">Para prevenir la ocurrencia y propagación te recomendamos:</p>'+
									'<ul class="list-style-one">'+
										'<li style="color:black; font-size:14px; font-weight:normal;">Mantener techos y canaletas siempre limpios de hojas o ramas</li>'+
										'<li style="color:black; font-size:14px; font-weight:normal;">En patios y jardínes mantener pasto y hierbas a no más de 10 cms y elimine las que estén secas</li>'+
										'<li style="color:black; font-size:14px; font-weight:normal;">Organizarse con vecinos para mantener entornos limpios de basuras, escombros o desechos</li>'+
										'<li style="color:black; font-size:14px; font-weight:normal;">Que la organización del sector se coordine con el municipio para diseñar una Agenda de Prevención Local que contenga medidas de fiscalización, vigilancia, educación e información</li>'+
									'</ul>'+
								'</div>';
				$('#report-body').append(recommendationText);
				$('#report-body').append(basicInformation);
			}
			else if (inc_quinquenio > 0 && inc_actual > 0) {
				if (inc_percentage_dif > 0) ocurrenciaVariation = 'un aumento';
				else ocurrenciaVariation = 'una disminución'

				if (sup_percentage_dif > 0) danoVariation = 'un aumento';
				else danoVariation = 'una disminución';
				
				recommendationText = '';
				basicInformation = '';
				recommendationText = '<div id="report-full-information" style="display:none;">'+
										'<p style="color:black; font-size:14px">Para el quinquenio 2015 a 2020, el radio de 2.5 kms alrededor de su vivienda registró '+inc_quinquenio+' incendios que afectaron '+checkIntegerOnDecimal(sup_quinquenio)+' hectáreas de vegetación. Durante la última temporada (2020-2021) se registraron '+inc_actual+' incendios que afectaron '+checkIntegerOnDecimal(sup_actual)+' hectáreas de vegetación, lo que representa '+ocurrenciaVariation+' de '+inc_percentage_dif+'% en la ocurrencia y '+danoVariation+' de '+sup_percentage_dif+'% en daño.</p>' +
										'<p style="color:black; font-size:14px">Las principales causas de incendios en tu sector se relacionan con '+causas+'. Para prevenir la ocurrencia y propagación te recomendamos:</p>'+
										'<ul class="list-style-one">'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Mantener techos y canaletas siempre limpios de hojas o ramas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">En patios y jardínes mantener pasto y hierbas a no más de 10 cms y elimine las que estén secas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Organizarse con vecinos para mantener entornos limpios de basuras, escombros o desechos</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Que la organización del sector se coordine con el municipio para diseñar una Agenda de Prevención Local que contenga medidas de fiscalización, vigilancia, educación e información</li>'+
										'</ul>'+
									'</div>';
				basicInformation = '<div id="report-basic-information">'+
										'<p style="color:black; font-size:14px">Las principales causas de incendios en tu sector se relacionan con '+causas+'.</p>'+
										'<p style="color:black; font-size:14px">Si deseas conocer el número total de incendios y el daño ocasionado, sugerimos descargar el reporte.</p>'+
										'<p style="color:black; font-size:14px">Para prevenir la ocurrencia y propagación te recomendamos:</p>'+
										'<ul class="list-style-one">'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Mantener techos y canaletas siempre limpios de hojas o ramas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">En patios y jardínes mantener pasto y hierbas a no más de 10 cms y elimine las que estén secas</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Organizarse con vecinos para mantener entornos limpios de basuras, escombros o desechos</li>'+
											'<li style="color:black; font-size:14px; font-weight:normal;">Que la organización del sector se coordine con el municipio para diseñar una Agenda de Prevención Local que contenga medidas de fiscalización, vigilancia, educación e información</li>'+
										'</ul>'+
									'</div>';
				$('#report-body').append(recommendationText);
				$('#report-body').append(basicInformation);
			}

			/** show the modal with riesgo report */
			$('#modal-of-report').modal('show');
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function exportPDF(rText) {
    let elementToPrint = document.createElement('div');
	let PDFcontainer = document.getElementById('recommendations-container');
    let PDFbody = document.getElementById('pdf-body');
	PDFbody.innerHTML = rText;

    elementToPrint.appendChild(PDFcontainer.cloneNode(true));

    html2pdf()
        .set({
            margin: 2,
            filename: 'Reporte_riesgo.pdf',
            html2canvas: {
                scale: 5,
                letterRendering: true
            },
            jsPDF: {
                unit: 'cm',
                format: 'letter',
                orientation: 'portrait'
            }
        })
        .from(elementToPrint)
        .save()
        .finally();
}

function checkIntegerOnDecimal(value) {
	if (value % 1 == 0) value = Math.round(value);
	else value = value.toFixed(2);
	return value;
}

function getPrevalenceScore(ocurrency, damage) {
	var json_matrix = {
		"-101,-101": { "-101,-101": -100, "-76,-100": -90, "-51,-75": -80, "-26,-50": -70, "-1,-25": -60, "0,0": -50, "1,25": -40, "26,50": -30, "51,75": -20, "76,100": -10, "101,101": 0 },
		"-76,-100": { "-101,-101": -90, "-76,-100": -80, "-51,-75": -70, "-26,-50": -60, "-1,-25": -50, "0,0": -40, "1,25": -30, "26,50": -20, "51,75": -10, "76,100": 0, "101,101": 10 },
		"-51,-75": { "-101,-101": -80, "-76,-100": -70, "-51,-75": -60, "-26,-50": -50, "-1,-25": -40, "0,0": -30, "1,25": -20, "26,50": -10, "51,75": 0, "76,100": 10, "101,101": 20 },
		"-26,-50": { "-101,-101": -70, "-76,-100": -60, "-51,-75": -50, "-26,-50": -40, "-1,-25": -30, "0,0": -20, "1,25": -10, "26,50": 0, "51,75": 10, "76,100": 20, "101,101": 30 },
		"-1,-25": { "-101,-101": -60, "-76,-100": -50, "-51,-75": -40, "-26,-50": -30, "-1,-25": -20, "0,0": -10, "1,25": 0, "26,50": 10, "51,75": 20, "76,100": 30, "101,101": 40 },
		"0,0": { "-101,-101": -50, "-76,-100": -40, "-51,-75": -30, "-26,-50": -20, "-1,-25": -10, "0,0": 0, "1,25": 10, "26,50": 20, "51,75": 30, "76,100": 40, "101,101": 50 },
		"1,25": { "-101,-101": -40, "-76,-100": -30, "-51,-75": -20, "-26,-50": -10, "-1,-25": 0, "0,0": 10, "1,25": 20, "26,50": 30, "51,75": 40, "76,100": 50, "101,101": 60 },
		"26,50": { "-101,-101": -30, "-76,-100": -20, "-51,-75": -10, "-26,-50": 0, "-1,-25": 10, "0,0": 20, "1,25": 30, "26,50": 40, "51,75": 50, "76,100": 60, "101,101": 70 },
		"51,75": { "-101,-101": -20, "-76,-100": -10, "-51,-75": 0, "-26,-50": 10, "-1,-25": 20, "0,0": 30, "1,25": 40, "26,50": 50, "51,75": 60, "76,100": 70, "101,101": 80 },
		"76,100": { "-101,-101": -10, "-76,-100": 0, "-51,-75": 10, "-26,-50": 20, "-1,-25": 30, "0,0": 40, "1,25": 50, "26,50": 60, "51,75": 70, "76,100": 80, "101,101": 90 },
		"101,101": { "-101,-101": 0, "-76,-100": 10, "-51,-75": 20, "-26,-50": 30, "-1,-25": 40, "0,0": 50, "1,25": 60, "26,50": 70, "51,75": 80, "76,100": 90, "101,101": 100 }
	}
	
	var $score = null;
	var $resDamage = function(ocurrencyKey) {
		let $result = null;
		for (damageKey in json_matrix[ocurrencyKey]) {
			let damageLimit = damageKey.split(',');
			if ((damage == 0) && (damage == damageLimit[0])) {
				$result = json_matrix[ocurrencyKey][damageKey];
			} else if ((damage >= 101) && (damage >= damageLimit[0])) {
				$result = json_matrix[ocurrencyKey][damageKey];
			} else if ((damage <= -101) && (damage <= damageLimit[0])) {
				$result = json_matrix[ocurrencyKey][damageKey];
			} else if (((damage >= 1) && (damage <= 100)) && ((damage >= damageLimit[0]) && (damage <= damageLimit[1]))) {
				$result = json_matrix[ocurrencyKey][damageKey];
			} else if (((damage >= -100) && (damage <= -1)) && ((damage >= damageLimit[1]) && (damage <= damageLimit[0]))) {
				$result = json_matrix[ocurrencyKey][damageKey];
			}
		}
		return $result;
	};
	
	for (ocurrencyKey in json_matrix) {
		let ocurrencyLimit = ocurrencyKey.split(',');
		if ((ocurrency == 0) && (ocurrency == ocurrencyLimit[0])) {
			$score = $resDamage(ocurrencyKey);
		} else if ((ocurrency >= 101) && (ocurrency >= ocurrencyLimit[0])) {
			$score = $resDamage(ocurrencyKey);
		} else if ((ocurrency <= -101) && (ocurrency <= ocurrencyLimit[0])) {
			$score = $resDamage(ocurrencyKey);
		} else if (((ocurrency >= 1) && (ocurrency <= 100)) && ((ocurrency >= ocurrencyLimit[0]) && (ocurrency <= ocurrencyLimit[1]))) {
			$score = $resDamage(ocurrencyKey);
		} else if (((ocurrency >= -100) && (ocurrency <= -1)) && ((ocurrency >= ocurrencyLimit[1]) && (ocurrency <= ocurrencyLimit[0]))) {
			$score = $resDamage(ocurrencyKey);
		}
	}
	return $score;
}

function getPanelLayers(overlayers) {
/** VMS Services */

	/** layers of the our service */
	wmsIncendios2020 = L.tileLayer.betterWms(window.location.origin + ':8080/geoserver/interfire/wms?', {
		layers: 'interfire:Incendios_2020_2021',
		format: 'image/png',
		transparent: true
	});
			
	wmsIncendiosQuinquenio = L.tileLayer.betterWms(window.location.origin + ':8080/geoserver/interfire/wms?', {
		layers: 'interfire:Incendios_Quinquenio',
		format: 'image/png',
		transparent: true		
	});	 

	wmsCausas2020 = L.tileLayer.betterWms(window.location.origin + ':8080/geoserver/interfire/wms?', {
		layers: 'interfire:Causas_Gral_2020_2021',
		format: 'image/png',
		transparent: true		
	});	
	
	wmsCausasQuinquenio = L.tileLayer.betterWms(window.location.origin + ':8080/geoserver/interfire/wms?', {
		layers: 'interfire:Causas_Gral_Quinquenio',
		format: 'image/png',
		transparent: true		
	});
			
	overLayers = [
	    {	
		    group: "Indicadores Interfire",
			collapsed: false,
			layers: [
                {
					active: overlayers[0],
					name: "Incendios 2020 - 2021",
					icon: '<i class="fas fa-fire"></i>',
					layer: wmsIncendios2020
				},
				{
					active: overlayers[1],
					name: "Incendios Quinquenio",
					icon: '<i class="fas fa-fire"></i>',
					layer: wmsIncendiosQuinquenio
				},
				{
					active: overlayers[2],
					name: "Causas 2020 - 2021",
					icon: '<i class="fas fa-puzzle-piece"></i>&nbsp;',
					layer: wmsCausas2020
				},
				{
					active: overlayers[3],
					name: "Causas Quinquenio",
					icon: '<i class="fas fa-puzzle-piece"></i>&nbsp;',
					layer: wmsCausasQuinquenio
				}
			]
		}
	];

	baseLayers = [
		{
			group: "Mapas Base",
			collapsed: false,
			layers: [
				{
					name: "OpenStreetMap",
					layer: openstreetmap
				},
				{
					name: "Carto Voyager",
					layer: Carto_voyager
				},
				{
					name: "Google Satelite",
					layer: google_maps
				},
				{
					name: "Google Terrain",
					layer: google_terrain
				}
			]
		}		
	];

	panelLayers = new L.Control.PanelLayers(baseLayers, overLayers, {
		compact: true,
		collapsed: false,	
		collapsibleGroups: true
	}).addTo(map);
}
