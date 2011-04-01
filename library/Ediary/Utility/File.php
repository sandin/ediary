<?php
class Ediary_Utility_File
{
    /**
     * Get sub-directori(es) of a directory, not including the directory which
     * its name is one of ".", ".." or ".svn"
     *
     * @see TomatoCMS
     *
     * @param string $dir Path to the directory
     * @return array
     */
    public static function getSubDir($dir)
    {
        if (!file_exists($dir)) {
            return array();
        }

        $subDirs 	 = array();
        $dirIterator = new DirectoryIterator($dir);
        foreach ($dirIterator as $dir) {
            if ($dir->isDot() || !$dir->isDir()) {
                continue;
            }
            $dir = $dir->getFilename();
            if ($dir == '.svn') {
                continue;
            }
            $subDirs[] = $dir;
        }
        return $subDirs;
    }
    
    /**
     * 目录不存在则递归创建
     * 
     * @param String $pathname
     * @param int $mode
     * @return boolean 目录存在或成功创建则返回true, 目录不存在且无法创建则返回false
     */
    public static function mkdir($pathname, $mode = 0755) {
       if (!file_exists($pathname)) {
           return mkdir($pathname, $mode, true);
       } 
       return true;
    }
}
