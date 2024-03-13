<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validtion\Rule;

class StoreBulkMachineRequest extends FormRequest
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
            '*.matricule'=>['required'],
            '*.etatMachine'=>['required'],
            '*.nomMachine'=>['required'],
            '*.caracteristiqueNumerique'=>['required'],
            '*.typeMachine'=>['required'],
            '*.modelMachine'=>['required'],
            '*.marque'=>['required'],
            '*.departement'=>['required']
        ];
    }
}