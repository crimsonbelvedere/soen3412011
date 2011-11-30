<?php
// USAGE:
// FIRST CREATE THIS OBJECT: my_adapter=new db_adapter();
// THEN USE THE query($query_string) function to query the database
// see the example at mockup/index.php line 63.
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
	//Takes a sql query string as argument.
	//Return a two-dimensional array.
	// FIRST DIMENSION: database rows.
	// SECOND DIMENSION: databse columns.
	// Precondition 1: Connection to the databse is established.
	// 				2: The database table exists.
	//              3: The sql query is syntactically correct
	//              4: CRITICAL!!!: there is a database called soen341 and its the one that contains all the information
	// Postcondition: NONE
	//Example: database table Student with column first_name and last_name
	//         There are three students in the databse:
	//         James Madisson.
	//         John Smith
	//         Marie Tremblay
	//         The input given is "select * from Student"
	//         The return value will be a two dimensional array.
	//         The first dimension will be an array with each value being a array itself (these are the rows in the databse).
	//         The second dimension will be the strings matching the values in database column first_name, last_name
	//         SO THIS IS WHAT WILL BE RETURNED:
	//         [
	//	    	["James","Madisson"]
	//			["John","Smith"]
	//			["Maries","Tremblay"]
	//         ]
	function query_map($query_string){
		return mysql_query($query_string,$this->db_conn);
		
	}
	function query($query_string){
		$query_set= mysql_query($query_string,$this->db_conn);
		$list=null;
		while ($row = mysql_fetch_assoc($query_set)) {
		    $list[]=$row;
		}
		return $list;		
	}
}
?>