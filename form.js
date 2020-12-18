import IMask from 'imask';


const form = document.querySelector('.form');
if (form) {
    const fileInput = document.querySelector('.form__input_hidden');
    const fileLabel = document.querySelector('.form__label_attach');

    const requiredInputs = document.querySelectorAll('.form__input_required');
    const submitBtn = form.querySelector('input[type="submit"]');

    const telInputs = document.querySelectorAll('input[type="tel"]');
    const mailInputs = document.querySelectorAll('input[type="email"]');

    const serviceForm = document.querySelector('#service-form');

    function validateTelMail(reg, value, input) {
        if (reg.test(value)) {
            input.classList.remove('form__input_invalid');
            input.classList.add('form__input_valid');
        } else {
            input.classList.add('form__input_invalid');
        }
    }

    telInputs.forEach(input => {
        let phoneMask = IMask(input, { mask: '+000 0000 0000' });
        input.addEventListener('input', e => validateTelMail(/\d{3} \d{4} \d{4}/, phoneMask.value, input));
    });

    mailInputs.forEach(input => input.addEventListener('input', e => validateTelMail(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i, input.value, input)));

    if (fileInput && fileLabel) {
        let labelSpan = fileLabel.querySelector('span');
        fileInput.addEventListener('change', function(e) {
            let countFiles = '';
            if (this.files && this.files.length >= 1) countFiles = this.files.length;
            if (countFiles) {
                labelSpan.innerText = 'Files: ' + countFiles;
            } else {
                labelSpan.innerText = labelSpan.innerHTML;
            }
        });
    }

    const formListBtn = document.querySelector('.form__list-btn');
    if (formListBtn) {
        let count = 0;
        formListBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (e.target.classList.contains('form__list-btn_clear')) {
                checkboxes.forEach(item => {
                    item.checked = false;
                });
                count = 0;
                this.innerHTML = '';
                this.innerHTML = 'Select the service';
            } else {
                this.classList.toggle('form__list-btn_active');
            }
        });

        const checkboxes = document.querySelectorAll('.form__input-checkbox');
        checkboxes.forEach(item => {
            item.addEventListener('change', e => {
                if (item.checked) {
                    count += 1;
                } else {
                    count -= 1;
                }
                formListBtn.innerHTML = `<span class="form__list-span">Selected: ${count}</span> <button class="form__list-btn_clear"></button>`;
            });
        });

    }


    requiredInputs.forEach(item => {
        item.addEventListener('blur', event => {
            if (!item.value.length) {
                item.classList.add('form__input_invalid');
            } else {
                item.classList.remove('form__input_invalid');
                item.classList.add('form__input_valid');
            }
        })
    });
}
