'use client';

import { useState } from 'react';
import Form from '../form-elements/Form';
import FormGroup from '../form-elements/FormGroup';
import Input from '../form-elements/Input';
import Textarea from '../form-elements/TextArea';
import Checkbox from '../form-elements/Checkbox';
import Button from '../button/Button';
import Message from '../message/Message';

type ContactFormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  subject: string;
  message: string;
  agreed: boolean;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialForm: ContactFormData = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  subject: '',
  message: '',
  agreed: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleCheckedChange = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      agreed: checked,
    }));

    setErrors((prev) => ({
      ...prev,
      agreed: '',
    }));
  };

  const validate = () => {
    const newErrors: ContactFormErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    if (!form.agreed) {
      newErrors.agreed = 'You must agree before sending the message.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseMessage('');
    setIsSuccess(null);

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          agreed: form.agreed,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsSuccess(false);
        setResponseMessage(data.message || 'Failed to send message.');
        return;
      }

      setIsSuccess(true);
      setResponseMessage('Your message has been sent successfully.');
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error('CONTACT FORM SUBMIT ERROR:', error);
      setIsSuccess(false);
      setResponseMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup col='col-2'>
        <Input
          name='firstName'
          placeholder='First Name'
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          name='lastName'
          placeholder='Last name'
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </FormGroup>

      <FormGroup col='col-2'>
        <Input
          name='company'
          placeholder='Company Name (Optional)'
          value={form.company}
          onChange={handleChange}
        />

        <Input
          name='email'
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
      </FormGroup>

      <FormGroup col='col-1'>
        <Input
          name='subject'
          placeholder='Enter message subject'
          value={form.subject}
          onChange={handleChange}
          error={errors.subject}
        />
      </FormGroup>

      <FormGroup col='col-1'>
        <Textarea
          name='message'
          placeholder='Write your message...'
          value={form.message}
          onChange={handleChange}
          error={errors.message}
          rows={6}
        />
      </FormGroup>

      <FormGroup col='col-1' className='mb-8'>
        <Checkbox
          checked={form.agreed}
          onCheckedChange={handleCheckedChange}
          error={errors.agreed}
        >
          I agree that my information may be used to respond to my inquiry.
        </Checkbox>
      </FormGroup>

      <div className='flex flex-col gap-3'>
        <Button
          type='submit'
          loading={isSubmitting}
          disabled={isSubmitting}
          size='md'
          variant='primary'
          className='w-fit'
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        {responseMessage && (
          <Message variant={isSuccess ? 'success' : 'error'}>
            {isSuccess
              ? 'Your message has been sent successfully.'
              : responseMessage || 'Something went wrong. Please try again.'}
          </Message>
        )}
      </div>
    </Form>
  );
}
