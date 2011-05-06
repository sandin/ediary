<?php
interface Ediary_Plugin_Interface {
    
    /**
     * return plugin's information
     */
    public function getInfo();
    
    /**
     * Call it when application boot 
     */
    public function bootPlugin();
}