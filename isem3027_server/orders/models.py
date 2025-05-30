from random import randint
from datetime import datetime
from django.db import models
from django.conf import settings
from products.models import Product


class Order(models.Model):
    invoice_no = models.IntegerField(blank=True)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()
    address = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    payment_id = models.CharField(max_length=100, blank=True)
    payment_token = models.CharField(max_length=100, blank=True)
    delivery_date = models.DateField()
    delivery_time = models.TimeField()


    def __str__(self):
        return str(self.invoice_no)

    def save(self, *args, **kwargs):
        if not self.invoice_no:  # new order
            self.invoice_no = generating_invoice()  # generate new invoice number
        super(Order, self).save(*args, **kwargs)

    def confirm_order(self):
        # update product quantity
        # After client payed
        self.product.quantity -= self.quantity
        self.product.save()
        self.payment_token = ''
        self.save()


def generating_invoice():
    i = ''.join(["%s" % randint(0, 9) for num in range(0, 5)])
    date_of_today = datetime.now().date().strftime("%d%m%Y")
    invoice = i + date_of_today
    try:
        Order.objects.get(invoice_no=invoice)
        return generating_invoice()
    except Order.DoesNotExist as e:
        return invoice
