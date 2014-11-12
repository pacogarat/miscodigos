<?php

namespace PG\Mcd\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Guzzle\Service\Client;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        $client = $this->get('tradedoubler.coupons.client');
        //$client = new Client();
        $response = $client->getCommand('GetCoupons', array('id'=>152739))->execute();
        var_dump($response);die();
        return array();
    }
}
