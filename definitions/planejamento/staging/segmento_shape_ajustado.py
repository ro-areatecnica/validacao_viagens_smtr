# # -*- coding: utf-8 -*-
# import numpy as np
# import pyproj
# from pyspark.sql.functions import col, explode, lit, udf
# from pyspark.sql.types import ArrayType, StringType
# from shapely import wkt
# from shapely.ops import substring, transform
#
# # Configuração de variáveis diretamento no código
# BUFFER_SEGMENTO_METROS = 20
# COMPRIMENTO_SHAPE = 500
# PROJECAO_SIRGAS_2000 = "EPSG:31983"
# PROJECAO_WGS_84 = "EPSG:4326"
# TABELA_REFERENCIA = "ro-areatecnica.planejamento_staging_ajustado.aux_shapes_geom_filtrada"
#
# # Principal função do process
# def process(session):
#     # Carregar dados da tabela de referência
#     df = session.read.format("bigquery").option("table", TABELA_REFERENCIA).load()
#
#     # Configuração de projeção
#     bq_projection = pyproj.CRS(PROJECAO_WGS_84)
#     shapely_projection = pyproj.CRS(PROJECAO_SIRGAS_2000)
#
#     def transform_projection(shape, from_shapely=False):
#         if from_shapely:
#             project = pyproj.Transformer.from_crs(
#                 shapely_projection, bq_projection, always_xy=True
#             ).transform
#         else:
#             project = pyproj.Transformer.from_crs(
#                 bq_projection, shapely_projection, always_xy=True
#             ).transform
#
#         return transform(project, shape)
#
#     def cut(line, distance, buffer_size):
#         line_len = line.length
#         dist_mod = line_len % distance
#         dist_range = list(np.arange(0, line_len, distance))
#         middle_index = (len(dist_range) // 2) + 1
#
#         last_final_dist = 0
#         lines = []
#
#         for i, _ in enumerate(dist_range, start=1):
#             if i == middle_index:
#                 cut_distance = dist_mod
#             else:
#                 cut_distance = distance
#             final_dist = last_final_dist + cut_distance
#             segment = substring(line, last_final_dist, final_dist)
#             lines.append(
#                 [
#                     str(i),
#                     transform_projection(segment, True).wkt,
#                     segment.length,
#                     transform_projection(segment.buffer(distance=buffer_size), True).wkt,
#                 ]
#             )
#             last_final_dist = final_dist
#
#         return lines
#
#     def cut_udf(wkt_string, distance, buffer_size):
#         line = transform_projection(wkt.loads(wkt_string))
#         return cut(line, distance, buffer_size=buffer_size)
#
#     # Registrar UDF
#     cut_udf = udf(cut_udf, ArrayType(ArrayType(StringType())))
#
#     # Aplicar transformação
#     df_segments = df.withColumn(
#         "shape_lists",
#         cut_udf(
#             col("wkt_shape"),
#             lit(COMPRIMENTO_SHAPE),
#             lit(BUFFER_SEGMENTO_METROS),
#         ),
#     )
#
#     df_exploded = (
#         df_segments.select(
#             "feed_version",
#             "feed_start_date",
#             "feed_end_date",
#             "shape_id",
#             explode(col("shape_lists")).alias("shape_list"),
#         )
#         .withColumn("id_segmento", col("shape_list").getItem(0))
#         .withColumn("wkt_segmento", col("shape_list").getItem(1))
#         .withColumn("comprimento_segmento", col("shape_list").getItem(2))
#         .withColumn("buffer_completo", col("shape_list").getItem(3))
#         .drop("shape_list")
#     )
#
#     return df_exploded