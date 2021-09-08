SELECT t2.created_at as dateTransaction,
    'NIT' AS typeIdentification,
    t3.nit AS identification,
    999999 as nApproval,
    t1.base_sub_total AS baseAmount,
    t1.base_tax_amount AS taxAmount,
    t1.base_shipping_amount AS shippingValue,
    JSON_EXTRACT(
        t2.payment_response,
        "$.body.dataPayment.paymentMethod"
    ) AS paymentMethod,
    t1.base_grand_total AS transactionValue,
    t2.item_reference AS itemReference,
    1500 as hicomeACH,
    750 as commissionUnitCostGateway
FROM orders t1
    INNER JOIN order_payment t2 ON t2.order_id = t1.id
    INNER JOIN companies t3 ON t3.id = t1.company_id
WHERE t2.item_reference IS NOT NULL
    AND JSON_EXTRACT(payment_gateway_response, "$.idRequest") IS NOT NULL
    AND JSON_EXTRACT(payment_gateway_response, "$.status") = 'APPROVED';