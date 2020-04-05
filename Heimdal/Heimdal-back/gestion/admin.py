from django.contrib import admin

# Register your models here.
from .models import *

# Register your models here.
admin.site.register(Recurso)
admin.site.register(Proyecto)
admin.site.register(Tarea)
admin.site.register(Auditoria)
admin.site.register(Validacion)