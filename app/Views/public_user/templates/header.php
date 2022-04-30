<!DOCTYPE html>
<html lang="es">

<!-- dream-property/  18 Nov 2019 04:56:17 GMT -->
<head>
<meta charset="utf-8">
<title>Evaluador - Interfire</title>
<!-- Stylesheets -->
<link href="<?= base_url('public/css/bootstrap.css') ?>" rel="stylesheet"> 
<link href="<?= base_url('public/css/style.css') ?>" rel="stylesheet">
<link href="<?= base_url('public/css/responsive.css') ?>" rel="stylesheet">

<!--Color Switcher Mockup-->
<link href="<?= base_url('public/css/color-switcher-design.css') ?>" rel="stylesheet">
<!--Color Themes-->
<link id="theme-color-file" href="<?= base_url('public/css/color-themes/orange-theme.css') ?>" rel="stylesheet">

<link rel="shortcut icon" href="<?= base_url('public/images/interfire-favicon.png') ?>" type="image/png">
<link rel="icon" href="<?= base_url('public/images/interfire-favicon.png') ?>" type="image/png">


<!-- Responsive -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script><![endif]-->
<!--[if lt IE 9]><script src="js/respond.js"></script><![endif]-->
</head>

<body>

<div class="page-wrapper">
    <!-- Preloader -->
    <div class="preloader"></div>

    <header class="main-header">
        <!--Header Top-->
        <div class="header-top" id="top-icon-nav">
            <div class="auto-container clearfix">
                <!--<div class="top-left clearfix">
                    <ul class="list">
                        <li><span class="icon fas fa-phone"></span> <a href="tel:+999–999–9999"> 999–999–9999</a></li>
					</ul>
                </div>-->
                <div class="clearfix" style="padding: 20px 0; text-align: center;">
					<div class="login-register">
						<h4 style="color:white;">Evalúa el riesgo de tu vivienda frente a un incendio forestal</h4>
					</div>
                </div>
            </div>
        </div>
        <!-- End Header Top -->

        <!-- Header Upper -->
        <div class="header-upper" id="mobile-nav">
            <div class="inner-container">
                <div class="auto-container clearfix">
                    <!--Info-->
                    <div style="padding: 20px 0; text-align: center; margin-bottom: -2%;">
                        <img src="<?= base_url('public/images/logo-interfire.png') ?>" width="200" alt="" title="">
                    </div>

                    <!--Nav Box-->
                    <div class="nav-outer clearfix">

                        <div class="outer-box clearfix">
                            <div class="search-box-btn" id="btn-modal" style="display:none;"><span class="icon flaticon-search"></span></div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End Header Upper-->

		<!--Sticky Header-->
        <div class="sticky-header">
        	<div class="auto-container clearfix">
            	<!--Logo-->
            	<div class="logo pull-left">
                	<a href="<?= site_url('/') ?>" class="img-responsive"><img src="<?= base_url('public/images/logo-interfire.png') ?>" width="100" alt="" title=""></a>
                </div>
                
				<!--Right Col-->
                <div class="right-col pull-right">
					<!-- Main Menu -->
                    <nav class="main-menu navbar-expand-md">
                        <div class="navbar-collapse collapse clearfix" id="navbarSupportedContent1">
                            <ul class="navigation clearfix"><!--Keep This Empty / Menu will come through Javascript--></ul>
                        </div>
                    </nav><!-- Main Menu End-->
                </div>
                
            </div>
        </div>
        <!--End Sticky Header-->
		
    	<!-- Mobile Menu  -->
        <div class="mobile-menu">
            <div class="menu-backdrop"></div>
            <div class="close-btn"><span class="icon far fa-window-close"></span></div>
            
            <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-->
            <nav class="menu-box">
            	<div class="nav-logo"><a href="<?= site_url('/') ?>"><img src="<?= base_url('public/images/logo-interfire.png') ?>" width="100" alt="" title=""></a></div>
                
                <ul class="navigation clearfix"><!--Keep This Empty / Menu will come through Javascript--></ul>
            </nav>
        </div><!-- End Mobile Menu -->

    </header>
    <!-- End Main Header -->
	
</div>  
<!--End pagewrapper-->

<!--Scroll to top-->
<div class="scroll-to-top scroll-to-target" data-target="html"><span class="fa fa-angle-up"></span></div>

<div id="search-popup" class="search-popup">
	<div class="close-search theme-btn" id="btn-close-window"><span class="fas fa-window-close"></span></div>
	<div class="popup-inner">
		<div class="overlay-layer"></div>
        <div class="search-form" id="response-put-marker" style="display:none;">
            <h3>Busca tu ubicación o coloca un marcador en el mapa para consultar información</h3>
        </div>     
        <div class="search-form" id="response-get-information" style="display:none; margin-top:75px;">
            <h3>Estamos buscando tu información</h3><br>
            <div class="text-center"><img src="<?= base_url('public/images/colibri-gif.gif') ?>" alt="" title=""></div>
            <h3 id="random-message-1" style="displat:none;">En las zonas de interfaz (donde conviven actividad humana y vegetación) ocurre casi el 60% de incendios forestales</h3><br>
            <h3 id="random-message-2" style="displat:none;">Casi el 100% de incendios forestales ocurren por accidente, negligencia o intencionalidad humana</h3><br>
            <h3 id="random-message-3" style="displat:none;">Los incendios forestales tienen altísimos efectos y costos humanos, sociales, ambientales y económicos</h3><br>
            <h3 id="random-message-4" style="displat:none;">Los científicos del cambio climático pronostican el aumento de incendios extremos</h3><br>
        </div>  
        <div class="search-form" id="response-for-system-problems" style="display:none;">
            <h3>Ocurrió un error inesperado. Por favor, inténtalo más tarde.</h3>
        </div>     
    </div>
</div>


<!--Scroll to top-->
<script src="<?= base_url('public/js/jquery.js') ?>"></script>
<script src="<?= base_url('public/js/popper.min.js') ?>"></script>
<script src="<?= base_url('public/js/jquery-ui.js') ?>"></script>
<script src="<?= base_url('public/js/bootstrap.min.js') ?>"></script>
<script src="<?= base_url('public/js/jquery.fancybox.js') ?>"></script>
<script src="<?= base_url('public/js/parallax.min.js') ?>"></script>
<script src="<?= base_url('public/js/isotope.js') ?>"></script>
<script src="<?= base_url('public/js/jquery.paroller.min.js') ?>"></script>
<script src="<?= base_url('public/js/owl.js') ?>"></script>
<script src="<?= base_url('public/js/wow.js') ?>"></script>
<script src="<?= base_url('public/js/tilt.jquery.min.js') ?>"></script>
<script src="<?= base_url('public/js/dropzone.js') ?>"></script>
<script src="<?= base_url('public/js/swiper.min.js') ?>"></script>
<script src="<?= base_url('public/js/appear.js') ?>"></script>
<script src="<?= base_url('public/js/script.js') ?>"></script>
<script src="<?= base_url('public/js/color-settings.js') ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.0/html2pdf.bundle.js"></script> <!-- html2pdf plugin -->

</body>


</html>