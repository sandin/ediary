<?php
class Ediary_Image_Factory {
    const GD      = 0;
    const IMAGICK = 1;
    const GMAGICK = 2;
    
    /**
     * Get Image Processor
     * 
     * @param int image library type
     * @throws Ediary_Image_Exception No Image Library
     * @return Ediary_Image_Interface Ediary_Image_Gmagick|Ediary_Image_GD
     */
    public static function create($type) {
        switch ($type) {
            case self::GMAGICK:
                return new Ediary_Image_Gmagick();
                break;
            case self::GD:
                return new Ediary_Image_GD();
                break;
            default:
                throw new Ediary_Image_Exception("Don't Support this library.");
        }
        return null;
    }
}