package com.example.demo;

import java.io.IOException;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AnimalService { 
    @Autowired
    private AnimalRepository animalRepository;

    public java.util.List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal getAnimalById(@PathVariable long id) {
        return animalRepository.findById(id).orElse(null);
    }

    public Object getAnimalByName(String name) {
        return animalRepository.getAnimalByName(name);
    }

    public Object getAnimalByTitle(String title) {
        return animalRepository.getAnimalByTitle(title);
    }

    public Object getAnimalByDescription(String description) {
        return animalRepository.getAnimalByDescription(description);
    }

    public Animal addAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    public Animal updateAnimal(Long id, Animal animal) {
        return animalRepository.save(animal);
    }

    public void deleteAnimal(Long id) {
        animalRepository.deleteById(id);
    }

    public String writeJSON(Animal animal) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("animal.json"), animal);
            return "Animal written to JSON file successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error writing animal to JSON file";
        }
    }
    
    public Object readJSON() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(new File("animal.json"), Animal.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
