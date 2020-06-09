# CoreShop Saferpay Payum Connector
This Bundle activates the Saferpay PaymentGateway in CoreShop.
It requires the [karser/PayumSaferpay](https://github.com/karser/PayumSaferpay) repository which will be installed automatically.

## Installation

#### 1. Composer

```json
    "coreshop/payum-saferpay-bundle": "~2.0.0"
```

#### 2. Activate
Enable the Bundle in Pimcore Extension Manager

#### 3. Setup
Go to Coreshop -> PaymentProvider and add a new Provider. Choose `saferpay` from `type` and fill out the required fields.

