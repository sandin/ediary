<?php
class Ediary_Filters extends Ediary_Hooks
{
    
    /**
     * @see Ediary_Hooks::register()
     */
    public static function addFilter($tag, $fn, $priority = 10, $acceptedArgs = 1)
    {
        return parent::register($tag, $fn, $priority, $acceptedArgs);
    }
    
    /**
     * Call the functions added to a filter hook.
     *  
     * @param string $tag The name of the filter hook.
     * @param mixed $value The value on which the filters hooked to <tt>$tag</tt> are applied on.
     * @param mixed $var,... Additional variables passed to the functions hooked to <tt>$tag</tt>.
     * @return mixed The filtered value after all hooked functions are applied to it.
     */
    public static function applyFilters($tag, $value) {
        self::getLogger()->info("Apply Filters " . $tag . ' ' . $value);
        
        $args = func_get_args();
        
        if (! self::hasRegister($tag)) {
            return $value;
        }
        
        ksort(self::$_hooks[$tag]); // by priority

        foreach (self::$_hooks[$tag] as $priority => $hooks) {
            foreach ( (array) $hooks as $hook) {
                if ( !is_null($hook[self::KEY_FN]) ) {
                    $value = call_user_func_array($hook[self::KEY_FN],
                        array_slice($args, 1, (int) $hook[self::KEY_ARGS]));
                }
            }
        }
        return $value;
    }
    
}