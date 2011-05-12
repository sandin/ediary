<?php
class Ediary_Debug
{
    public static function startProfile() {
        if (! extension_loaded('xhprof')) {
            return;
        }
        xhprof_enable();
    }

    public static function stopProfile() {
        if (! extension_loaded('xhprof')) {
            return;
        }
        
        // stop profiler
        $xhprof_data = xhprof_disable();

        //
        // Saving the XHProf run
        // using the default implementation of iXHProfRuns.
        //
        $XHPROF_ROOT = '/var/www/tools/xhprof';
        include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_lib.php";
        include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_runs.php";

        $xhprof_runs = new XHProfRuns_Default();

        // Save the run under a namespace "xhprof_foo".
        //
        // **NOTE**:
        // By default save_run() will automatically generate a unique
        // run id for you. [You can override that behavior by passing
        // a run id (optional arg) to the save_run() method instead.]
        //
        $run_id = $xhprof_runs->save_run($xhprof_data, "xhprof_foo");

        echo '<a target="_about" href="'
     	     ."http://localhost/tools/xhprof/xhprof_html/index.php?run=$run_id&source=xhprof_foo"
     	     .'">profile</a>';
    }
}