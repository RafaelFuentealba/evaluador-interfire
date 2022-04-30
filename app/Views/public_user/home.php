<!--Map Section-->
<section class="map-banner-section">
    <!--Map Outer-->
    <div class="map-outer">
        <div class="google-map" id="map" style="height:540px;">
        </div>
    </div>
</section>
<!--End Map Section-->

<!-- Begin modal and form -->
<div class="container">
    <div class="modal fade" id="modal-of-questions" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Formulario</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body" style="border:none;">
                    <div id="smartwizard" style="border:none;">
                        <div id="fail-questions-form" class="alert alert-danger text-center" style="display:none;">
                            Debes completar toda la información solicitada <a href="javascript:void(0);" id="close-fail-questions-form" class="float-right"><i class="fas fa-times" title="Cerrar"></i></a>
                        </div>
                        <ul class="nav" style="border:none;">
                            <li>
                                <a class="nav-link" href="#step-1">
                                    Patio
                                </a>
                            </li>
                            <li>
                                <a class="nav-link" href="#step-2">
                                    Limpieza techo
                                </a>
                            </li>
                            <li>
                                <a class="nav-link" href="#step-3">
                                    Entorno
                                </a>
                            </li>
                        </ul>

                        <form id="questions-form" action="">
                            <div class="tab-content">
                                <div id="step-1" class="tab-pane" role="tabpanel">
                                    <div class="card mt-3 mb-4 border-0">
                                        <div class="header">
                                            <h6><b>¿Cuál de los siguientes elementos mantiene usted en su patio, jardín o antejardín?</b></h6>
                                        </div>
                                        <div class="body mt-2">
                                            <div class="row">
                                                <div class="col-sm-5 col-md-6">Madera (tablas, leña, despuntes, aserrín, etc)</div>
                                                <div class="col-sm-5 col-md-6">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element1" value="100">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element1" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element1" value="0">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5 col-md-6">Pasto seco con +10 cms de altura</div>
                                                <div class="col-sm-5 col-md-6">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element2" value="100">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element2" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element2" value="0">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5 col-md-6">Árboles</div>
                                                <div class="col-sm-5 col-md-6">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element3" value="100">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element3" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element3" value="0">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5 col-md-6">Terraza de madera</div>
                                                <div class="col-sm-5 col-md-6">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element4" value="100">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element4" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element4" value="0">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5 col-md-6">Toldos de paja, tela o acrílico</div>
                                                <div class="col-sm-5 col-md-6">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element5" value="100">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element5" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element5" value="0">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5 col-md-6">Cercos de madera</div>
                                                <div class="col-sm-5 col-md-6">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element6" value="100">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element6" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element6" value="0">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5 col-md-6">Cercos vivos</div>
                                                <div class="col-sm-5 col-md-6">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element7" value="100">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element7" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="element7" value="0">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="step-2" class="tab-pane" role="tabpanel">
                                    <div class="card mt-3 mb-4 border-0">
                                        <div class="header">
                                            <h6><b>¿Con qué frecuencia diría usted que sus techos y canaletas, están limpios de hojas secas o ramas?</b></h6>
                                        </div>
                                        <div class="body mt-2">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="limpiezatecho1" value="0">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="limpiezatecho1" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="limpiezatecho1" value="100">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="step-3" class="tab-pane" role="tabpanel">
                                    <div class="card mt-3 mb-4 border-0">
                                        <div class="header">
                                            <h6><b>¿Con qué frecuencia diría usted que el entorno de su vivienda (calles, áreas verdes, sitios eriazos) están limpios de basura, desechos agrícolas, forestales u otros?</b></h6>
                                        </div>
                                        <div class="body mt-2">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="entorno1" value="0">
                                                        <label class="form-check-label" for="inlineRadio1">Siempre</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="entorno1" value="50">
                                                        <label class="form-check-label" for="inlineRadio2">A veces</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="entorno1" value="100">
                                                        <label class="form-check-label" for="inlineRadio2">Nunca</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="submit" id="btn-send-data" class="btn btn-primary btn-round waves-effect" value="Enviar datos" style="display:none;">
                    <button type="button" id="btn-modal-close" class="btn btn-danger btn-round waves-effect" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End modal and form -->

<!-- Begin modal with report of incendios -->
<div class="container">
    <div class="modal fade" id="modal-of-report" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:black;" id="report-header"></h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body" id="report-body" style="border:none; text-align:justify;">
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn-download-report" class="btn btn-success btn-round waves-effect">Descargar</button>
                    <button type="button" id="btn-close-report" class="btn btn-danger btn-round waves-effect" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End modal with report of incendios -->

<!-- Begin pdf of recommendations -->
<div style="display:none;">
    <div class="container" id="recommendations-container">
        <div class="card mb-4 border-0">
            <div class="logo-outer mt-3 text-center">
                <div class="logo"><img src="<?= base_url('public/images/logo-interfire.png') ?>" width="250" alt="" title=""></div>
            </div>
            <hr>
            <div class="header mt-3" id="pdf-header">
                <div class="alert alert-success text-center">
                    <h6><b id="pdf-title"></b></h6>
                </div>
            </div>
            <div class="body" id="pdf-body" style="text-align:justify;">
            </div>
            <div class="footer">
                <div class="logo-outer text-center" style="margin-top:100px;">
                    <div class="logo"><img src="<?= base_url('public/images/logo-corfo.png') ?>" width="150" alt="" title=""></div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End pdf of recommendations -->


<!-- resources to add map and elements -->
<link rel="stylesheet" href="<?= base_url('public/css/map/app.css'); ?>" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
<link rel="stylesheet" href="<?= base_url('public/css/map/leaflet-panel-layers.css'); ?>" />
<link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.css" />
<link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css" />  
<link rel="stylesheet" href="https://maps.locationiq.com/v2/libs/leaflet-geocoder/1.9.6/leaflet-geocoder-locationiq.min.css">

<!-- resources to build form where user will complete information -->
<link href="https://cdn.jsdelivr.net/npm/smartwizard@5/dist/css/smart_wizard_all.min.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?= base_url('public/css/public-user/main.css'); ?>" />



<!-- resources to add map and elements -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
<script src="<?= base_url('public/js/public-user/leaflet-panel-layers.js'); ?>"></script>
<script src="<?= base_url('public/js/public-user/L.TileLayer.BetterWMS.js'); ?>"></script>
<script src="https://unpkg.com/esri-leaflet"></script>
<script src="https://unpkg.com/esri-leaflet-geocoder"></script>
<script src="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.js" charset="utf-8"></script>
<script src="<?= base_url('public/js/public-user/Leaflet.Control.Custom.js'); ?>"></script>
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js"></script>
<script src="https://maps.locationiq.com/v2/libs/leaflet-geocoder/1.9.6/leaflet-geocoder-locationiq.min.js"></script>
<script src="<?= base_url('public/js/public-user/app.js'); ?>"></script>

<!-- resources to build form where user will complete information -->
<script src="https://cdn.jsdelivr.net/npm/smartwizard@5/dist/js/jquery.smartWizard.min.js" type="text/javascript"></script>
<script src="<?= base_url('public/js/public-user/main.js'); ?>"></script>

