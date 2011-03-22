<?php

class Diary_DoController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->viewRenderer->setNoRender();
        $this->_helper->layout->disableLayout();
    }

    public function indexAction()
    {
        // action body
    }

    public function saveAction()
    {
        // NEED POST [id, title, content]
        if (! isset($_POST['diary']) ) {
            return;
        }
        
        $_POST['diary']['content'] = html_entity_decode($_POST['diary']['content']);
        
        $stripTagsFilter = new Zend_Filter_StripTags();
        $stripTagsFilter->setTagsAllowed(array("p"));
        
        $filter = array(
            'id' => 'Digits',
            'title' => 'StripTags',
            'content' => $stripTagsFilter
        );
        $validator = array();
        $input = new Zend_Filter_Input($filter, $validator, $_POST['diary']);

        if ($input->isValid() && !$input->hasMissing()) {
            $id = $input->id;
            $title = $input->title;
            $content = $input->getUnescaped('content'); // it's safe, stripTags instead escape

            $data = compact("id", "title", "content");

            //$data = Ediary_Database_Db::addMagicQuotes($data);
            $this->_helper->json( Zend_Json::encode(array('diary' => $data)) );

            /*
             if (isset($_POST['diary']['id'])) {
             $this->_forward('update');
             } else {
             //$this->_forward('create');
             }
             */
        }
    }

    public function createAction() {
        $params = $this->_parsePost();
        $diary = Ediary_Diary::create($params);
        Ediary_Response::send($diary->toArray());
    }

    public function updateAction() {
        $params = $this->_parsePost();
        $diary = Ediary_Diary::update($params);
        Ediary_Response::send($diary->toArray());
    }


}

