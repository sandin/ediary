<?php
class Ediary_Dom
{
    /**
     * Create a DOM element HTML
     * 
     * @param String $tag html tag, link 'div'
     * @param String $value element value
     * @param Array $attrs attrs of element
     * @return string element HTML
     */
    public static function createElement($tag, $value = '', $attrs = array()) {
        $html = "<" . $tag ;
        if (null != $attrs) {
            foreach ($attrs as $n => $v) {
                $html .= ' ' . $n . '="' . $v . '"';
            }
        }
        $html .= '>' . $value . '</' . $tag . '>';
        //var_dump($html);
        return $html;
    }
    
    /**
     * Add a Class to attrs list
     * 
     * @param String $className
     * @param array list of attrs, like array('class' => 'foo')
     * @return array attrs
     */
    public static function addClass($className, $attrs) {
        if (! is_array($attrs)) {
            return $attrs; // must be an array
        }
        
        if (! isset($attrs['class'])) {
            $attrs['class'] = $className;
        } else {
            $attrs['class'] .= ' ' . $className;
        }
        
        return $attrs;
    }
}