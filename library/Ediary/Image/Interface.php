<?php
interface Ediary_Image_Interface 
{
    /**
     * Create a thumbnail and write it into a output file
     * 
     * $param String $input input file(image)
     * @param int $width max width
     * @param int $height max height
     * @param String $output output file name(path)
     * 		  如果提供 '${1}_thumbnail' 类似的值则表示将输出文件保存在原文件目录, 只是变换文件名. 
     * 		  ${1} 为原文件名(不含扩展名)的暂位符, 输出文件将只修改文件名, 保留扩展名和目录部分.
     * 
     * @return output filename(path), FALSE on fail.
     */
    function thumbnail($input, $maxWidth, $maxHeight, $output);
}
