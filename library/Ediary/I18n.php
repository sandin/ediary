<?php
class Ediary_I18n
{
    const ZH = 'zh';
    const EN = 'en';
    
    public static function getTranslate($language) {
        // Support Languages
        $i18n = array(
        array( 'adapter' => 'gettext',
			   'locale'  => self::ZH,
			   'content' => APPLICATION_PATH . '/data/languages/zh.mo' ),
        array( 'adpater' => 'gettext',
			   'locale'  => self::EN,
			   'content' => APPLICATION_PATH . '/data/languages/en.mo')
        );

        $translate = null;

        // Load lanuage files
        for ($i = 0, $l = count($i18n); $i < $l; $i++) {
            $lang = $i18n[$i];
             
            if (file_exists($lang['content'])) {
                if (0 == $i) {
                    $translate = new Zend_Translate($lang);
                } else {
                    $translate->addTranslation($lang);
                }
            } else {
                Ediary_Logger::log2($lang['locale']
                . ' translation file is missing : '. $lang['content']);
            }
        }

        $translate->setLocale($language); // unsafe, zh would be null
        return $translate;
    }
}