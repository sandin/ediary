<?php
class Ediary_Metadata_Options extends Ediary_Metadata
{
    /**
     * @param String $application_id
     */
    public function __construct($application_id = 0) {
        parent::__construct('options', 'app_id', $application_id);
    }
}