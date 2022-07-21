package com.ssafy.db.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrePersist;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "certification")
@Getter
@Setter
@DynamicUpdate
public class Email extends BaseEntity{
	@Column(name="user_email")
    String userEmail;
	
	@Column(name="certification_check")
    String certificationCheck;
	
	@CreationTimestamp
    @Column(name="register_time", updatable = false)
    private LocalDateTime registerTime;
}
