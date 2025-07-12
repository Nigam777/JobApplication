package com.example.Jobportal.utility;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import com.example.Jobportal.entity.Sequence;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class Utilities {

    private final MongoOperations mongoOperations;

    // Constructor Injection
    public Utilities(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public  long getNextSequence(String sequenceName) {
        Query query = new Query(Criteria.where("_id").is(sequenceName));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);
        Sequence sequence = mongoOperations.findAndModify(query, update, options, Sequence.class);
        return sequence != null ? sequence.getSeq() : 1L;
    }
    public static String generateOTP() {
         StringBuilder otp = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < 6; i++) {
            int randomNumber = random.nextInt(10);
            otp.append(randomNumber);
        }
        return otp.toString();
    }


}
