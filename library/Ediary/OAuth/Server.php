<?php
require_once('OAuth/OAuth.php');

class Ediary_OAuth_Server extends OAuthServer {
  public function get_signature_methods() {
    return $this->signature_methods;
  }
}