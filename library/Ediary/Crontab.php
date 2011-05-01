<?php
/**
 * 定时任务处理器
 * 需外部定时触发其trigger方法
 * 
 * @author lds
 */
class Ediary_Crontab
{
    private static $logger;
    private static $_tasks = array();
    private static $_running = false;
    private static $_options;
    
    public function __construct() {
        self::$logger = Ediary_Logger::getLogger();
        self::$_options = new Ediary_Metadata_Options();
        $this->loadTasks();
    }
    
    /**
     * Trigger, 外部触发
     * 
     * @param String $id 触发客户端ID(一般为ip地址)
     * @return int 此时触发运行的任务数(实际运行)
     */
    public function trigger($id = 'Unknown') {
        //$this->resetTasks();
        $count = $this->start();
        self::$logger->info("Crantab tringer from " . $id . ", run tasks: " .$count);
        return $count;
    }
    
    /**
     * Start all tasks
     * 只会运行当前需要被运行的计划任务, 即:
     * 距该任务最后一次运行, 现已超过了指定的间隔时间
     * 
     * @return int 运行任务数
     */
    public function start() {
        try
        {
            self::$_running = true;
            $count = 0;
            foreach (self::$_tasks as $task => $options) {
                $once = $this->runTask($task);
                if ($once) $count++;
            }
            self::$_running = false;
            return $count;
        }
        catch (Exception $e)
        {
            self::$logger->error($e->getMessage());
        } 
        return -1; 
    }
    
  
    
    /**
     * 安排指定的任务从指定的延迟后开始进行重复的固定延迟执行。
     * 
     * @param Ediary_CronJob $task 所要安排的任务
     * @param long $delay 执行任务前延迟时间, 单位为秒
     * @param long $period 执行各后续任务之间的时间间隔, 单位为秒, 不提供表示只运行一次
     * @throws Exception
     * @return bool
     */
    public function schedule($task, $delay, $period = -1) {
        if (! $task instanceof Ediary_CronJob) {
            throw new Exception(__CLASS__ . " argument #0 must implement Ediary_CronJob");
        }
        
        $taskClassName = get_class($task);
        self::$_tasks[$taskClassName] = array('delay' => $delay, 'period' => $period);
        self::$logger->info("schedule task : " . $taskClassName . ", delay " . $delay . ", period " . $period);
        
        // first run
        set_time_limit(0);
        sleep($delay/60);
        $this->runTask($taskClassName);
        
        if (-1 === $period) { // only run once
            unset(self::$_tasks[$taskClassName]);
        }
        $this->saveTasks();
    }
    
    /**
     * Save tasks list into DB
     */
    public function saveTasks() {
        self::$_options->set(__CLASS__, serialize(self::$_tasks));
    }
    
    /**
     * Load Task list from DB
     */
    public function loadTasks() {
        $option = self::$_options->get(__CLASS__);
        self::$_tasks = (isset($option)) ? unserialize($option) : array();
    }
    
    public function hasTasks() {
        return (! empty(self::$_tasks) );
    }
    
    /**
     * Dump task list in DB
     */
    public function resetTasks() {
        self::$_options->delete(__CLASS__);
        return $this;
    }
    
    /**
     * Run a task
     * 当前时间 - 最后运行时间 >= 间隔时间, 才会执行该任务
     * 
     * @param String $name task name
     * @return bool run once or not
     */
    private function runTask($name) {
        if (!isset(self::$_tasks[$name]) || !class_exists($name)) {
            throw new Exception("no such job");
        }
        
        $period  = self::$_tasks[$name]['period'];
        $lastRun = $this->getLastRunTime($name);
        $cronJob = new $name();
        //var_dump(time() - $lastRun);
        
        $runOnce = false;
        if ($cronJob instanceof Ediary_CronJob 
          && (time()- $lastRun >= $period) ) 
        {
            $cronJob->run();
            self::$_tasks[$name]['lastRunTime'] = time();
            $this->saveTasks();
            $runOnce = true;
        }
        return $runOnce;
    }
    
    /**
     * Get a list of all tasks' name
     * 
     * @return Array
     */
    public function getTasks() {
        return self::$_tasks;
    }
    
    /**
     * Get task's last run time 
     * 
     * @param String $taskName
     * @return number
     */
    private function getLastRunTime($taskName) {
        if (isset(self::$_tasks[$taskName]['lastRunTime'])) {
            return self::$_tasks[$taskName]['lastRunTime'];
        }
        return -1;
    }
    
}