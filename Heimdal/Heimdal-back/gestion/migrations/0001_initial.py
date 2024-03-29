# Generated by Django 2.2.12 on 2020-05-26 08:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=50)),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion_corta', models.CharField(max_length=140)),
                ('descripcion_larga', models.CharField(max_length=255, null=True)),
                ('estado', models.CharField(max_length=1, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_final', models.DateField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Recurso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=50)),
                ('nombre', models.CharField(max_length=50)),
                ('primer_apellido', models.CharField(max_length=50)),
                ('segundo_apellido', models.CharField(max_length=50, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('tipo', models.CharField(max_length=1)),
                ('imagen', models.ImageField(default='image/no-img.png', upload_to='image')),
                ('activo', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tarea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=50)),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion_corta', models.CharField(max_length=140)),
                ('descripcion_larga', models.CharField(max_length=255, null=True)),
                ('prioridad', models.CharField(max_length=1, null=True)),
                ('estado', models.CharField(max_length=1, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_final', models.DateField(null=True)),
                ('proyecto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.Proyecto')),
                ('usuario_creacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creacion_tarea', to='gestion.Recurso')),
                ('usuarios_asignados', models.ManyToManyField(blank=True, related_name='asignados_tarea', to='gestion.Recurso')),
            ],
        ),
        migrations.CreateModel(
            name='Validacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=50)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.Recurso')),
            ],
        ),
        migrations.CreateModel(
            name='Tiempo_Tarea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('horas', models.IntegerField()),
                ('tarea', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.Tarea')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asignados_tiempo', to='gestion.Recurso')),
            ],
        ),
        migrations.AddField(
            model_name='proyecto',
            name='usuario_creacion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creacion_proyecto', to='gestion.Recurso'),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='usuarios_asignados',
            field=models.ManyToManyField(blank=True, related_name='asignados_proyecto', to='gestion.Recurso'),
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('texto', models.CharField(max_length=500, null=True)),
                ('tarea', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.Tarea')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.Recurso')),
            ],
        ),
        migrations.CreateModel(
            name='Auditoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_cambio', models.DateTimeField(auto_now_add=True)),
                ('tipo', models.CharField(max_length=1, null=True)),
                ('referencia_id', models.IntegerField()),
                ('usuario_cambio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion.Recurso')),
            ],
        ),
    ]
