package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping("/animals")
    public Object getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @GetMapping("/animals/{id}")
    public Animal getAnimalbyId(@PathVariable long id) {
        return animalService.getAnimalById(id);
    }

    @GetMapping("/animals/search")
    public Object getAnimalByName(@RequestParam String name) {
        if (name != null) {
            return animalService.getAnimalByName(name);
        } else {
            return animalService.getAllAnimals();
        }
    }

    @GetMapping("/animals/category/{category}")
    public Object getAnimalsByType(@PathVariable String category) {
        return animalService.getAnimalByTitle(category);
    }

    @GetMapping("/animals/description")
    public Object getAnimalByDescription(@PathVariable String description) {
        return animalService.getAnimalByDescription(description);
    }

    @PostMapping("animals")
    public Object addAnimal(@RequestBody Animal animal) {
        return animalService.addAnimal(animal);
    }
        
    @PutMapping("/animals/{id}")
    public Animal updateAnimal(@PathVariable Long id, @RequestBody Animal animal) {
        animalService.updateAnimal(id, animal);
        return animalService.getAnimalById(id);
    }

    @DeleteMapping("/animals/{id}")
    public Object deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
        return animalService.getAllAnimals();
    }    

    @PostMapping("/animals/writeFile")
    public Object writeJSON(@RequestBody Animal animal) {
        return animalService.writeJSON(animal);
    }

    @GetMapping("/animals/readFile")
    public Object readJSON() {
        return animalService.readJSON();
    }
}
