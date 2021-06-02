
from django.db import models
from django.contrib.auth.models import User


class Recurso(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    primer_apellido = models.CharField(max_length=50)
    segundo_apellido = models.CharField(max_length=50,null=True)
    email = models.EmailField(max_length=254)
    tipo = models.CharField(max_length=1)
    imagen = models.ImageField(upload_to = 'image', default = 'image/no-img.png')
    activo = models.BooleanField(default=True)

    def __str__(self):         
        return self.nombre
    
class Proyecto(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    descripcion_corta = models.CharField(max_length=140)
    descripcion_larga = models.CharField(max_length=255,null=True)
    estado = models.CharField(max_length=1,null=True)
    usuario_creacion = models.ForeignKey(Recurso, on_delete = models.CASCADE, related_name='creacion_proyecto')
    fecha_creacion = models.DateTimeField(auto_now=False, auto_now_add=True)
    fecha_final = models.DateField(null=True)
    usuarios_asignados = models.ManyToManyField(Recurso, related_name='asignados_proyecto',blank=True) #checkear many to many
   
    def __str__(self):         
        return self.nombre
    

class Tarea(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    descripcion_corta = models.CharField(max_length=140)
    descripcion_larga = models.CharField(max_length=255,null=True)
    prioridad = models.CharField(max_length=1,null=True)
    estado = models.CharField(max_length=1,null=True)
    usuario_creacion = models.ForeignKey(Recurso, on_delete = models.CASCADE, related_name='creacion_tarea')
    fecha_creacion = models.DateTimeField(auto_now=False, auto_now_add=True)
    fecha_final = models.DateField(null=True)
    proyecto = models.ForeignKey(Proyecto,on_delete = models.CASCADE)
    usuarios_asignados = models.ManyToManyField(Recurso, related_name='asignados_tarea',blank=True) #checkear many to many

    def __str__(self):         
        return self.nombre


class Auditoria(models.Model):
    fecha_cambio = models.DateTimeField(auto_now=False, auto_now_add=True)
    usuario_cambio = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    tipo = models.CharField(max_length=1,null=True) #Tarea,Proyecto, Recurso, etc
    referencia_id = models.IntegerField() # ids


class Validacion(models.Model):
    usuario = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    password = models.CharField(max_length=50)


class Tiempo_Tarea(models.Model):
    usuario = models.ForeignKey(Recurso, related_name='asignados_tiempo', on_delete = models.CASCADE)
    tarea = models.ForeignKey(Tarea,on_delete = models.CASCADE)
    fecha = models.DateField()
    horas = models.IntegerField()

class Comentario(models.Model):
    fecha_creacion = models.DateTimeField(auto_now=False, auto_now_add=True)
    usuario = models.ForeignKey(Recurso, on_delete = models.CASCADE)
    texto = models.CharField(max_length=500,null=True)
    tarea = models.ForeignKey(Tarea, on_delete = models.CASCADE)