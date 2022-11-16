package ro.tuc.ds2022.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Device {
   public Device()
    {

        measurements=new ArrayList<Measurement>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String address;
    private Float maximumHourlyEnergyConsumption;
    private Long owner;
    @OneToMany(fetch= FetchType.EAGER)
    @JoinColumn(name="owner")
    private List<Measurement> measurements;
}
