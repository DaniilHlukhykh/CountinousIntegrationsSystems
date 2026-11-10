import fs from 'node:fs'

let arrayRecords = []

if (fs.existsSync('data.json')) {
    arrayRecords = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
}

const registeredSchemas = []

const fileDB = {
    registerSchema(name, schema) {
        registeredSchemas.push({ name: name, schema: schema })
    },
    getTable(name) {
       const tableSchema = registeredSchemas.find((item) => item.name === name)
      
       if(!tableSchema){
          throw new Error(`Schema not found ${name}`)
      }
        return  { 
     getAll() { return arrayRecords },

     getById(id){ 
        const record = arrayRecords.find((item) => item.id === id)
      
         if(!record){
          throw new Error(`Record not found ${id}`)
      }

        return record
    },
     create(data){

        const newId = Math.max(0, ...arrayRecords.map((item) => item.id)) + 1
        const newRecord = { ...data, id: newId, createDate: new Date() }
        arrayRecords.push(newRecord)

        fs.writeFileSync('data.json', JSON.stringify(arrayRecords))

        return newRecord
    },
    update(id, data){
        const index =  arrayRecords.findIndex((item) => item.id === id)
        if(index === -1){
            throw new Error(`Record not found ${id}`)
        }
        
          const updatedRecord = arrayRecords[index] = { ...arrayRecords[index], ...data }

           fs.writeFileSync('data.json', JSON.stringify(arrayRecords))
           
           return updatedRecord
    },
    delete(id){
        const index =  arrayRecords.findIndex((item) => item.id === id)
        if(index === -1){
            throw new Error(`Record not found ${id}`)
        }
        arrayRecords.splice(index, 1)
                   fs.writeFileSync('data.json', JSON.stringify(arrayRecords))
                   return id
        
    }
      
    }

    }
    
}

export default fileDB