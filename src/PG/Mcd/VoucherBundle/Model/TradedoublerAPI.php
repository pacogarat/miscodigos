<?php

namespace PG\Mcd\VoucherBundle\Model;

use Guzzle\Service\Client;

class TradedoublerAPI extends Client
{
    
    public function __construct($baseUrl = '', $config = null) {
        $this->baseUrl = $baseUrl;
        parent::__construct($baseUrl, $config);
    }
    public static function convertString($value, $api) {
        return 152739;
    }
}
