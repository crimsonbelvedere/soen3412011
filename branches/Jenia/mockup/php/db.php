<?php
class db_adapter{
	var $db_conn=null;
	function __construct(){
		$this->connect();
		
	}
	function connect(){
		$this->db_conn=mysql_connect('localhost','root','');
		mysql_select_db('soen341',$this->db_conn);
		
	}
	function close_connection(){
		mysql_close($this->db_conn);
	}
	//TODO: return an array with each element in the database.
	// Each element is to be represented by an associative array.
	//use $row = mysql_fetch_assoc( $query_set );
	//This must be in a loop, ofcourse, and return new array with 
	//each element being a $row
	function query($query_string){
		return mysql_query($query_string,$this->db_conn);
		
	}
}
?>