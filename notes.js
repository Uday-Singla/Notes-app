const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.bold("New note added!"))
    }
    else {
        console.log(chalk.red.bold("Note title taken!"))
    }
}

const saveNotes = (notes) => {
    notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notesToKeep.length === notes.length) {
        console.log(chalk.red.bold("No note found!"))
    }
    else {
        saveNotes(notesToKeep)
        console.log(chalk.green.bold("Note deleted!"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold("Your notes : "))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else {
        console.log(chalk.red.bold("No note found!"))
    }
}

const loadNotes = () => {
    try {
        dataBuffer = fs.readFileSync('notes.json')
        dataJSON = dataBuffer.toString()
        notes =  JSON.parse(dataJSON)
        return notes
    } catch (e) {
        return []
    }
}
    

module.exports = {
    loadNotes: loadNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}