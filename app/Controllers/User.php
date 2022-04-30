<?php

namespace App\Controllers;
use App\Models\CausaModel;

class User extends BaseController
{
    private $db;

    public function __construct() {
        helper('Form');
        helper(['url', 'form']);
        $this->db = \Config\Database::connect('default');
        $this->dbEvaluador = \Config\Database::connect('evaluador');
    }

    public function index() {
        //return view('public_user/templates/header').view('public_user/home').view('public_user/templates/footer');
        return view('public_user/templates/header').view('public_user/home').view('public_user/templates/footer');
    }

    public function getRiesgo() {
        if (!empty($_POST)) {
            $lng = $this->request->getPost('longitude-zone');
            $lat = $this->request->getPost('latitude-zone');
            $radius = 0.025; /** 2500 metros de radio */

            $latlng_to_geom = "ST_SetSRID(ST_GeomFromText('POINT(".$lng." ".$lat.")'), 4326)";
            $latlng_to_buffer = "ST_Buffer(ST_SetSRID(ST_MakePoint(".$lng.",".$lat."), 4326), (".$radius."*100/111.32))";
    
            $schema_table_incendios = 'public."incendios_quinquenio"';
            $query_incendios = $this->db->query("SELECT
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2015 - Junio 2016' THEN 1 ELSE 0 END), 0) AS inc_2015,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2016 - Junio 2017' THEN 1 ELSE 0 END), 0) AS inc_2016,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2017 - Junio 2018' THEN 1 ELSE 0 END), 0) AS inc_2017,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2018 - Junio 2019' THEN 1 ELSE 0 END), 0) AS inc_2018,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2019 - Junio 2020' THEN 1 ELSE 0 END), 0) AS inc_2019,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2020 - Junio 2021' THEN 1 ELSE 0 END), 0) AS inc_2020
                    FROM ".$schema_table_incendios." WHERE ST_WITHIN(geom, ".$latlng_to_buffer.");");
            
            $query_superficie = $this->db->query("SELECT
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2015 - Junio 2016' THEN sup_total ELSE 0 END), 0) AS sup_2015,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2016 - Junio 2017' THEN sup_total ELSE 0 END), 0) AS sup_2016,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2017 - Junio 2018' THEN sup_total ELSE 0 END), 0) AS sup_2017,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2018 - Junio 2019' THEN sup_total ELSE 0 END), 0) AS sup_2018,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2019 - Junio 2020' THEN sup_total ELSE 0 END), 0) AS sup_2019,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2020 - Junio 2021' THEN sup_total ELSE 0 END), 0) AS sup_2020
                    FROM ".$schema_table_incendios." WHERE ST_WITHIN(geom, ".$latlng_to_buffer.");");

            $schema_table_pendientes = 'public."pendientes_pais"';
            $query_pendiente = $this->db->query("SELECT gridcode
                    FROM ".$schema_table_pendientes." WHERE ST_WITHIN(".$latlng_to_geom.", geom);");

            $schema_table_combustible = 'public."combustible"';
            $query_combustible = $this->db->query("SELECT puntaje,
                        (ST_Area(ST_Intersection(geom, ".$latlng_to_buffer.")) / ST_Area(".$latlng_to_buffer."))*100 AS pc_superficie
                    FROM ".$schema_table_combustible." WHERE ST_DWITHIN(geom, ".$latlng_to_geom.", ".$radius.");");

            $response = [
                'incendios' => $query_incendios->getRowArray(),
                'superficie' => $query_superficie->getRowArray(),
                'pendiente' => $query_pendiente->getResultArray(),
                'combustible' =>  $query_combustible->getResultArray()
            ];
            return $this->response->setJSON($response);
        }
    }

    public function getCausasEspecificas() {
        if (!empty($_POST)) {
            $causaModel = new CausaModel($this->dbEvaluador);

            $lng = $this->request->getPost('longitude-zone');
            $lat = $this->request->getPost('latitude-zone');
            $radius = 0.025; /** 2500 metros de radio */
            $latlng_to_buffer = "ST_Buffer(ST_SetSRID(ST_MakePoint(".$lng.",".$lat."), 4326), (".$radius."*100/111.32))";

            $schema_table_incendios = 'public."incendios_quinquenio"';

            $query_incendios = $this->db->query("SELECT
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2015 - Junio 2016' THEN 1 ELSE 0 END), 0) AS inc_2015,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2016 - Junio 2017' THEN 1 ELSE 0 END), 0) AS inc_2016,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2017 - Junio 2018' THEN 1 ELSE 0 END), 0) AS inc_2017,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2018 - Junio 2019' THEN 1 ELSE 0 END), 0) AS inc_2018,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2019 - Junio 2020' THEN 1 ELSE 0 END), 0) AS inc_2019,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2020 - Junio 2021' THEN 1 ELSE 0 END), 0) AS inc_2020
                    FROM ".$schema_table_incendios." WHERE ST_WITHIN(geom, ".$latlng_to_buffer.");");
            
            $query_superficie = $this->db->query("SELECT
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2015 - Junio 2016' THEN sup_total ELSE 0 END), 0) AS sup_2015,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2016 - Junio 2017' THEN sup_total ELSE 0 END), 0) AS sup_2016,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2017 - Junio 2018' THEN sup_total ELSE 0 END), 0) AS sup_2017,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2018 - Junio 2019' THEN sup_total ELSE 0 END), 0) AS sup_2018,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2019 - Junio 2020' THEN sup_total ELSE 0 END), 0) AS sup_2019,
                        COALESCE(sum(CASE WHEN temporada = 'Julio 2020 - Junio 2021' THEN sup_total ELSE 0 END), 0) AS sup_2020
                    FROM ".$schema_table_incendios." WHERE ST_WITHIN(geom, ".$latlng_to_buffer.");");

            $query_contador_causas = $this->db->query("SELECT count(id_especifico) AS cantidad_especificas, id_especifico FROM ".$schema_table_incendios." WHERE ST_WITHIN(geom, ".$latlng_to_buffer.") AND id_especifico <> 999 GROUP BY id_especifico ORDER BY cantidad_especificas DESC LIMIT 3;");
            $contador_causas_especificas = $query_contador_causas->getResultArray();
            $nombreCausas = [];
            foreach ($contador_causas_especificas as $causa) {
                $getCausaName = $causaModel->select('nombre_causa_especifica')->where('causa_id', $causa['id_especifico'])->first();
                array_push($nombreCausas, $getCausaName);
            }

            $response = [
                'incendios' => $query_incendios->getRowArray(),
                'superficie' => $query_superficie->getRowArray(),
                'principales_causas' => $contador_causas_especificas,
                'causas' => $nombreCausas
            ];
            
            return $this->response->setJSON($response);
        }
    }
}
