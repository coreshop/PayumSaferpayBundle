/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2020 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.provider.gateways.saferpay');
coreshop.provider.gateways.saferpay = Class.create(coreshop.provider.gateways.abstract, {

    optionalFields: [
        {name: 'payment_methods', defaultValue: '', description: 'Possible values: AMEX, BANCONTACT, BONUS, DINERS, DIRECTDEBIT, EPRZELEWY, EPS, GIROPAY, IDEAL, INVOICE, JCB, MAESTRO, MASTERCARD, MYONE, PAYPAL, PAYDIREKT, POSTCARD, POSTFINANCE, SOFORT, TWINT, UNIONPAY, VISA.' },
        {name: 'wallets', defaultValue: 'MASTERPASS', description: 'Possible values: MASTERPASS'},
        {name: 'notification_merchant_email', defaultValue: '', description: ''},
        {name: 'notification_payer_email', defaultValue: '', description: ''},
        {name: 'styling_css_url', defaultValue: '', description: ''},
        {name: 'styling_content_security_enabled', defaultValue: '', description: ''},
        {name: 'styling_theme', defaultValue: '', description: ''},
        {name: 'config_set', defaultValue: '', description: ''},
        {name: 'payer_note', defaultValue: '', description: ''},
    ],

    getLayout: function (config) {

        var storeEnvironments = new Ext.data.ArrayStore({
            fields: ['environment', 'environmentName'],
            data: [
                ['test', 'Test'],
                ['production', 'Production']
            ]
        }), storeInterface = new Ext.data.ArrayStore({
            fields: ['interface', 'interfaceName'],
            data: [
                ['PAYMENT_PAGE', 'Payment Page'],
                ['TRANSACTION', 'Transaction']
            ]
        }), optionalFields = [{
            xtype: 'label',
            anchor: '100%',
            style: 'display:block; padding:5px; background:#f5f5f5; border:1px solid #eee; font-weight: 300;',
            html: '<a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize">Payment (PaymentPage, v1.10)</a>'
        }];

        Ext.Array.each(this.optionalFields, function (field) {
            var fieldName = field.name,
                defaultValue = field.defaultValue,
                description = field.description,
                value = config.optionalParameters && config.optionalParameters[fieldName] ? config.optionalParameters[fieldName] : defaultValue;

            optionalFields.push({
                xtype: 'textfield',
                fieldLabel: fieldName,
                name: 'gatewayConfig.config.optionalParameters.' + fieldName,
                length: 255,
                flex: 1,
                labelWidth: 250,
                anchor: '100%',
                value: value
            });

            if (description !== '') {
                optionalFields.push({
                    xtype: 'label',
                    text: description,
                    value: value,
                    style: 'margin: 5px 0; display:block; padding:2px; background:#f5f5f5; border:1px solid #eee; font-weight: 300; word-wrap:break-word;'
                });
            }
        });

        return [
            {
                xtype: 'combobox',
                fieldLabel: t('saferpay.config.environment'),
                name: 'gatewayConfig.config.environment',
                value: config.environment ? config.environment : '',
                store: storeEnvironments,
                triggerAction: 'all',
                valueField: 'environment',
                displayField: 'environmentName',
                mode: 'local',
                forceSelection: true,
                selectOnFocus: true
            },
            {
                xtype: 'textfield',
                fieldLabel: t('saferpay.config.username'),
                name: 'gatewayConfig.config.username',
                length: 255,
                value: config.username ? config.username : ''
            },
            {
                xtype: 'textfield',
                fieldLabel: t('saferpay.config.password'),
                name: 'gatewayConfig.config.password',
                length: 255,
                value: config.password ? config.password : ''
            },
            {
                xtype: 'textfield',
                fieldLabel: t('saferpay.config.customer_id'),
                name: 'gatewayConfig.config.customerId',
                length: 255,
                value: config.customerId ? config.customerId : ''
            },
            {
                xtype: 'textfield',
                fieldLabel: t('saferpay.config.terminal_id'),
                name: 'gatewayConfig.config.terminalId',
                length: 255,
                value: config.terminalId ? config.terminalId : ''
            },
            {
                xtype: 'combobox',
                fieldLabel: t('saferpay.config.interface'),
                name: 'gatewayConfig.config.interface',
                value: config.interface ? config.interface : 'PAYMENT_PAGE',
                store: storeInterface,
                triggerAction: 'all',
                valueField: 'interface',
                displayField: 'interfaceName',
                mode: 'local',
                forceSelection: true,
                selectOnFocus: true
            },
            {
                xtype: 'fieldset',
                title: t('saferpay.config.optional_parameter'),
                collapsible: true,
                collapsed: true,
                autoHeight: true,
                labelWidth: 250,
                anchor: '100%',
                flex: 1,
                defaultType: 'textfield',
                items: optionalFields
            }
        ];
    }
});
