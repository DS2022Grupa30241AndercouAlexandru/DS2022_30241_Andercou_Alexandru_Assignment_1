package ro.tuc.ds2022.controllers.handlers.dto;

import lombok.Data;

@Data
public class DeviceMeasurementDto {
    private Long device_id;
    private String timestamp;
    private Float energyCon;

}
