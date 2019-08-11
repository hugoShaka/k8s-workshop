<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="login", methods={"GET"})
     */
    public function login(): Response
    {
        return new Response('OK', Response::HTTP_OK);
    }

    /**
     * @Route("/health", name="login", methods={"GET"})
     */
    public function health(): Response
    {
        return new Response('I\'m aliiiive !', Response::HTTP_OK);
    }
}
