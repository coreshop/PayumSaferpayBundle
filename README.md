# CoreShop Saferpay Payum Connector
This Bundle activates the Saferpay PaymentGateway in CoreShop.
It requires the [dachcom-digital/payum-saferpay](https://github.com/dachcom-digital/payum-saferpay) repository which will be installed automatically.

## Installation

#### 1. Composer
    ```json
    "coreshop/payum-saferpay-bundle": "dev-master"
    ```
#### 2. Activate
Enable the Bundle in Pimcore Extension Manager

#### 3. Setup
Go to Coreshop -> PaymentProvider and add a new Provider. Choose `saferpay` from `type` and fill out the required fields.

