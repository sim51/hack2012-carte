'use strict';

var elasticurl = 'http://hack2012.logisima.com/hack2012';

/* Services */
angular.module('elastic', [ ])
    /* Elastic service*/
    .factory('$elastic', function($http, $location, $rootScope){
        return {
            search:function( lat, lng, query, theme, type, geo ){
                query += '*';
                if(theme!='all'){
                    query += ' AND theme:\'' + theme + '\'';
                }
                var url = elasticurl + '/_search/?';
                var data = "{" +
                                "\"from\" : 0, \"size\" : 200," +
                                "\"query\" : {" +
                                "    \"query_string\" : {\"query\" : \"" + query + "\"}" +
                                "}," +
                                "\"filter\" : {"
                if(type !='all'){
                    data +=     " \"and\" : [{";
                }
                data +=         "        \"geo_distance\" : {" +
                                "                \"distance\" : \"" + geo + "km\"," +
                                "                \"pin\" : {" +
                                "                    \"lat\":" + lat + "," +
                                "                    \"lon\" :" + lng +
                                "                }" +
                                "        }";
                if(type!='all'){
                    data +=     "         },{\"term\" : {" +
                               "               \"type\": \"" + type + "\"" +
                                "          }}]";
                }
                //if(theme!='all'){
                //    data +=     "         },{\"term\" : {" +
                //                "               \"theme\": \"" + theme + "\"" +
                //                "          }}]";
                //}
                data +=         "}," +
                                "\"sort\" : [" +
                                "        {" +
                                "            \"_geo_distance\" : {" +
                                "                \"pin\" : {" +
                                "                    \"lat\":" + lat + "," +
                                "                    \"lon\" :" + lng +
                                "                }," +
                                "                \"order\" : \"asc\"," +
                                "                \"unit\" : \"km\"" +
                                "            }" +
                                "        }" +
                                "    ]," +
                                "\"facets\" : {" +
                                "    \"geo\" : {" +
                                "        \"geo_distance\" : {" +
                                "            \"pin\" : {" +
                                "                 \"lat\":" + lat + "," +
                                "                 \"lon\" :" + lng +
                                "            }," +
                                "            \"ranges\" : [" +
                                "                { \"to\" : 0.3 }," +
                                "                { \"from\" : 0.3, \"to\" : 1 }," +
                                "                { \"from\" : 1, \"to\" : 5 }," +
                                "                { \"from\" : 5, \"to\" : 10 }," +
                                "                { \"from\" : 10, \"to\" : 20 }," +
                                "                { \"from\" : 20, \"to\" : 50 }," +
                                "                { \"from\" : 50, \"to\" : 100 }" +
                                "            ]" +
                                "        }" +
                                "    }," +
                                "    \"type\": {" +
                                "        \"terms\" : {" +
                                "            \"field\":\"type\"" +
                                "        }" +
                                "    }," +
                                "    \"theme\": {" +
                                "        \"terms\" : {" +
                                "            \"field\":\"theme\"" +
                                "        }" +
                                "    }" +
                                "}" +
                            "}";
                return $http.post( url, data ).then(function (response){
                    if( response.status == 200 ){
                        return response.data;
                    }else{
                    	$rootScope.error = "Error";
                        $location.path('/error');
                    }
                });
            }
        }
    });
