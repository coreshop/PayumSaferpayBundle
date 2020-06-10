<?php
/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2020 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

namespace CoreShop\Payum\SaferpayBundle\Event;

use CoreShop\Bundle\PayumBundle\Model\GatewayConfig;
use CoreShop\Component\Payment\Model\PaymentInterface;
use Payum\Core\Reply\ReplyInterface;
use Payum\Core\Request\Refund;
use Payum\Core\Payum;

class RefundEvent
{
    /**
     * @var Payum
     */
    protected $payum;

    /**
     * @param Payum $payum
     */
    public function __construct(Payum $payum)
    {
        $this->payum = $payum;
    }

    /**
     * @param PaymentInterface $payment
     * @throws ReplyInterface
     */
    public function refund(PaymentInterface $payment)
    {
        /** @var GatewayConfig $gatewayConfig */
        $gatewayConfig = $payment->getPaymentProvider()->getGatewayConfig();

        $saferPay = $this->payum->getGateway($gatewayConfig->getGatewayName());
        $saferPay->execute(new Refund($payment));
    }
}
