package ro.tuc.ds2022.controllers.handlers.dto;

import lombok.Data;

@Data
public class MeasurementDto {

   private Float energyCon;
   private String  unityOfM;

   private String timestamp;
   private Long id;

}
