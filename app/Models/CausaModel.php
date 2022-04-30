<?php

namespace App\Models;

use CodeIgniter\Model;

class CausaModel extends Model
{
    protected $table      = 'public."causas"';
    protected $primaryKey = 'causa_id';

    protected $useAutoIncrement = true;

    protected $returnType     = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['causa_id', 'nombre_causa_especifica', 'medida_responsable', 'grupo_causa_especifica', 'causa_general', 'grupo',
                                'updated_at', 'deleted'];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}

?>