package com.amar.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SequenceGeneratorService {

    @Autowired
    private SequenceRepository sequenceRepository;

    public synchronized String generateSequence(String seqName){
        Sequence sequence = sequenceRepository.findById(seqName).orElse(new Sequence());
        sequence.setId(seqName);

        int newSeqValue = sequence.getSeq() + 1;
        sequence.setSeq(newSeqValue);

        sequenceRepository.save(sequence);

        return String.format("B-%03d", newSeqValue);
    }
}
