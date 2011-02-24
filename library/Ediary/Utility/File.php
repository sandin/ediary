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
}
