<?php

namespace App\Http\Requests\V2;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validtion\Rule;

class StoreBulkDepartementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            '*.nom_departement'=>['required'],
            '*.code_departement'=>['required']
        ];
    }
}
