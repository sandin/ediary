<?php

class Admin_ThemeController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        Ediary_Auth::checkAccessPermission('admin');
        $this->_helper->layout->setLayout('admin');
        $this->_user = Zend_Registry::get(Ediary_Auth::KEY);
    }

    public function indexAction()
    {
        // action body
        $this->view->themes = Ediary_Admin_Theme::getThemesFormDir();
    }
    
    public function updateAction() 
    {
        $themeManager = new Ediary_Admin_Theme();
        $result = $themeManager->update(); // install all themes under /public/theme
        
        if ($result) {
            $this->view->message = _t("更新成功");
            $this->view->themesInstalled = $themeManager->findAll();
        } else {
            $this->view->message = _t("更新失败");
        }
    }


}

