<?php
/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2017 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
*/

namespace CoreShop\Payum\SaferpayBundle\Extension;

use CoreShop\Component\Order\Model\OrderInterface;
use CoreShop\Component\Order\Repository\OrderRepositoryInterface;
use CoreShop\Component\Core\Model\PaymentInterface;
use Payum\Core\Bridge\Spl\ArrayObject;
use Payum\Core\Extension\Context;
use Payum\Core\Extension\ExtensionInterface;
use Payum\Core\Request\Convert;

final class ConvertPaymentExtension implements ExtensionInterface
{
    /**
     * @var OrderRepositoryInterface
     */
    private $orderRepository;

    /**
     * @param OrderRepositoryInterface $orderRepository
     */
    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * @param Context $context
     */
    public function onPostExecute(Context $context)
    {
        $action = $context->getAction();

        $previousActionClassName = get_class($action);
        if (false === stripos($previousActionClassName, 'ConvertPaymentAction')) {
            return;
        }

        /** @var Convert $request */
        $request = $context->getRequest();
        if (false === $request instanceof Convert) {
            return;
        }

        /** @var PaymentInterface $payment */
        $payment = $request->getSource();
        if (false === $payment instanceof PaymentInterface) {
            return;
        }

        /** @var OrderInterface $order */
        $order = $payment->getOrder();
        $gatewayLanguage = 'en';

        if (!empty($order->getLocaleCode())) {
            $orderLanguage = $order->getLocaleCode();
            if (strpos($orderLanguage, '_') !== false) {
                $gatewayLanguage = explode('_', $orderLanguage)[0];
            } else {
                $gatewayLanguage = $orderLanguage;
            }
        }

        $result = ArrayObject::ensureArrayObject($request->getResult());

        $result['optional_payer_language_code'] = $gatewayLanguage;

        $request->setResult((array)$result);

    }

    /**
     * {@inheritdoc}
     */
    public function onPreExecute(Context $context)
    {

    }

    /**
     * {@inheritdoc}
     */
    public function onExecute(Context $context)
    {
    }
}
