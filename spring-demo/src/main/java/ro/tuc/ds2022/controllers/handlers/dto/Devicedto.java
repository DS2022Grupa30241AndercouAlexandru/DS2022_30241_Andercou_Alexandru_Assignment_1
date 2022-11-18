package ro.tuc.ds2022.controllers.handlers.dto;


import lombok.Data;
import ro.tuc.ds2022.entities.Measurement;

import java.util.List;
@Data
public class Devicedto {
    private Long id;
    private String name;
    private String description;
    private String address;
    private Float maximumHourlyEnergyConsumption;
    private List<Measurement> measurements;
}
