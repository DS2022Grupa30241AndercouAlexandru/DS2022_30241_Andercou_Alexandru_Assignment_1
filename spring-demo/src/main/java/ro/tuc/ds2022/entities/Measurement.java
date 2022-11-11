package ro.tuc.ds2022.entities;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Data

public class Measurement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;
    private Time time;
    private Float EnergyConsumption;
    private String UnityOfMeasurement;
    private Long owner;


}
