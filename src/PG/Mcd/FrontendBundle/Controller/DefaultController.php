<?php

namespace PG\Mcd\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Guzzle\Service\Client;
use Guzzle\Service\Command\OperationCommand;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        $client = $this->get('tradedoubler.coupons.client');
        $command = $client->getCommand('GetCoupons', array('id'=>152843));
        $response = $command->execute();
        var_dump($response);die();
        return array();
    }
}
