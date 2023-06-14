<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class facture extends Mailable
{
    use Queueable, SerializesModels;
    public $datalist;
    /**
     * Create a new message instance.
     * 
     * @return void
     */
    public function __construct(Array $datalist)
    {
        //
        $this->datalist=$datalist;
    }

    /**
    * Build the message
    *
    * @return $this
    */
    public function build()
    {
        return $this->subject('checkOut Message')->view('emails.facture');
    }
}
