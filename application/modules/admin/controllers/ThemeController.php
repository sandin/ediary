<?php

class Admin_ThemeController extends Zend_Controller_Action
{
    private $_user;

    public function init()
    {
        /* Initialize action controller here */
        //FIXME: 判断是否为管理员
        $this->_user = Zend_Registry::get('user');
        if (!isset($this->_user) || $this->_user->id != 3) {
            $this->_redirect("/");
        }
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

